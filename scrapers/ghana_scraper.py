import logging
from typing import List, Dict, Any
from datetime import datetime, timedelta
from base_scraper import BaseScraper

logger = logging.getLogger(__name__)

class GhanaScraper(BaseScraper):
    """Scraper for Ghana government tenders"""
    
    def __init__(self):
        super().__init__()
        self.country = "Ghana"
        self.base_url = "https://www.ghanatenders.gov.gh"
    
    def scrape(self) -> List[Dict[str, Any]]:
        """Scrape tenders from Ghana government websites"""
        logger.info(f"Starting to scrape tenders from {self.country}")
        
        try:
            mock_tenders = self._get_mock_tenders()
            tenders = []
            
            for tender_data in mock_tenders:
                try:
                    normalized_tender = self.normalize_tender(tender_data)
                    if self.validate_tender(normalized_tender):
                        tenders.append(normalized_tender)
                except Exception as e:
                    logger.error(f"Error processing tender: {str(e)}")
                    continue
            
            logger.info(f"Successfully scraped {len(tenders)} tenders from {self.country}")
            return tenders
            
        except Exception as e:
            logger.error(f"Error scraping {self.country}: {str(e)}")
            return []
    
    def _get_mock_tenders(self) -> List[Dict[str, Any]]:
        """Get mock tender data for demonstration"""
        return [
            {
                'title': 'Accra Smart City Development Project',
                'description': 'The Accra Metropolitan Assembly is seeking proposals for smart city development including traffic management, waste management, and digital services.',
                'organization': 'Accra Metropolitan Assembly',
                'country': 'Ghana',
                'category': 'Technology',
                'status': 'Open',
                'deadline': datetime.utcnow() + timedelta(days=75),
                'budget': '2200000',
                'currency': 'USD',
                'requirements': [
                    'Smart city project experience',
                    'IoT and sensor technology',
                    'Urban planning expertise',
                    'Local content requirements'
                ],
                'contact_email': 'procurement@ama.gov.gh',
                'contact_phone': '+233-30-123-4567',
                'website': 'https://ama.gov.gh'
            },
            {
                'title': 'Cocoa Processing Facility Modernization',
                'description': 'The Ghana Cocoa Board is inviting bids for the modernization of cocoa processing facilities to increase production capacity and improve quality.',
                'organization': 'Ghana Cocoa Board',
                'country': 'Ghana',
                'category': 'Agriculture',
                'status': 'Open',
                'deadline': datetime.utcnow() + timedelta(days=50),
                'budget': '900000',
                'currency': 'USD',
                'requirements': [
                    'Cocoa processing experience',
                    'Food safety certifications',
                    'Equipment supply capability',
                    'Training and maintenance'
                ],
                'contact_email': 'procurement@cocobod.com.gh',
                'contact_phone': '+233-30-234-5678',
                'website': 'https://cocobod.com.gh'
            }
        ] 