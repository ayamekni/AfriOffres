import os
import json
import logging
from datetime import datetime
from pymongo import MongoClient
from apscheduler.schedulers.blocking import BlockingScheduler
from apscheduler.triggers.cron import CronTrigger
from dotenv import load_dotenv

# Import scrapers
from nigeria_scraper import NigeriaScraper
from kenya_scraper import KenyaScraper
from ghana_scraper import GhanaScraper

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('scrapers.log'),
        logging.StreamHandler()
    ]
)

logger = logging.getLogger(__name__)

class ScraperManager:
    def __init__(self):
        self.mongodb_uri = os.getenv('MONGODB_URI', 'mongodb://localhost:27017/')
        self.client = MongoClient(self.mongodb_uri)
        self.db = self.client.afrioffres
        self.tenders_collection = self.db.tenders
        
        # Initialize scrapers
        self.scrapers = {
            'nigeria': NigeriaScraper(),
            'kenya': KenyaScraper(),
            'ghana': GhanaScraper()
        }
        
        # Initialize scheduler
        self.scheduler = BlockingScheduler()
    
    def run_scraper(self, country):
        """Run a specific scraper"""
        try:
            logger.info(f"Starting scraper for {country}")
            scraper = self.scrapers.get(country)
            
            if not scraper:
                logger.error(f"No scraper found for {country}")
                return
            
            tenders = scraper.scrape()
            self.save_tenders(tenders, country)
            logger.info(f"Completed scraper for {country}. Found {len(tenders)} tenders")
            
        except Exception as e:
            logger.error(f"Error running scraper for {country}: {str(e)}")
    
    def run_all_scrapers(self):
        """Run all scrapers"""
        logger.info("Starting all scrapers")
        for country in self.scrapers.keys():
            self.run_scraper(country)
        logger.info("Completed all scrapers")
    
    def save_tenders(self, tenders, source_country):
        """Save tenders to MongoDB"""
        try:
            for tender in tenders:
                # Add metadata
                tender['source_country'] = source_country
                tender['scraped_at'] = datetime.utcnow()
                
                # Check if tender already exists (based on title and organization)
                existing = self.tenders_collection.find_one({
                    'title': tender['title'],
                    'organization': tender['organization']
                })
                
                if existing:
                    # Update existing tender
                    self.tenders_collection.update_one(
                        {'_id': existing['_id']},
                        {'$set': tender}
                    )
                    logger.debug(f"Updated existing tender: {tender['title']}")
                else:
                    # Insert new tender
                    self.tenders_collection.insert_one(tender)
                    logger.debug(f"Inserted new tender: {tender['title']}")
            
            logger.info(f"Saved {len(tenders)} tenders from {source_country}")
            
        except Exception as e:
            logger.error(f"Error saving tenders: {str(e)}")
    
    def load_sample_data(self):
        """Load sample data for development"""
        try:
            sample_file = os.path.join('data', 'sample_tenders.json')
            if os.path.exists(sample_file):
                with open(sample_file, 'r', encoding='utf-8') as f:
                    sample_tenders = json.load(f)
                
                for tender in sample_tenders:
                    tender['source_country'] = 'sample'
                    tender['scraped_at'] = datetime.utcnow()
                    
                    # Check if already exists
                    existing = self.tenders_collection.find_one({
                        'title': tender['title'],
                        'organization': tender['organization']
                    })
                    
                    if not existing:
                        self.tenders_collection.insert_one(tender)
                
                logger.info(f"Loaded {len(sample_tenders)} sample tenders")
            else:
                logger.warning("Sample data file not found")
                
        except Exception as e:
            logger.error(f"Error loading sample data: {str(e)}")
    
    def schedule_scrapers(self):
        """Schedule scrapers to run periodically"""
        # Run scrapers every 6 hours
        self.scheduler.add_job(
            self.run_all_scrapers,
            CronTrigger(hour='*/6'),
            id='scrape_all',
            name='Scrape all countries every 6 hours'
        )
        
        # Run individual scrapers at different times to avoid conflicts
        self.scheduler.add_job(
            lambda: self.run_scraper('nigeria'),
            CronTrigger(hour='0', minute='0'),
            id='scrape_nigeria',
            name='Scrape Nigeria daily at midnight'
        )
        
        self.scheduler.add_job(
            lambda: self.run_scraper('kenya'),
            CronTrigger(hour='2', minute='0'),
            id='scrape_kenya',
            name='Scrape Kenya daily at 2 AM'
        )
        
        self.scheduler.add_job(
            lambda: self.run_scraper('ghana'),
            CronTrigger(hour='4', minute='0'),
            id='scrape_ghana',
            name='Scrape Ghana daily at 4 AM'
        )
        
        logger.info("Scheduled scrapers")
    
    def start(self):
        """Start the scraper manager"""
        try:
            # Load sample data first
            self.load_sample_data()
            
            # Schedule scrapers
            self.schedule_scrapers()
            
            # Run initial scrape
            self.run_all_scrapers()
            
            # Start scheduler
            logger.info("Starting scheduler...")
            self.scheduler.start()
            
        except KeyboardInterrupt:
            logger.info("Stopping scraper manager...")
            self.scheduler.shutdown()
        except Exception as e:
            logger.error(f"Error in scraper manager: {str(e)}")
        finally:
            self.client.close()

if __name__ == '__main__':
    manager = ScraperManager()
    manager.start() 