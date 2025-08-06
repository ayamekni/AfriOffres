import requests
import logging
from abc import ABC, abstractmethod
from datetime import datetime
from typing import List, Dict, Any
from bs4 import BeautifulSoup
import time
import random

logger = logging.getLogger(__name__)

class BaseScraper(ABC):
    """Base class for all scrapers"""
    
    def __init__(self):
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        })
    
    @abstractmethod
    def scrape(self) -> List[Dict[str, Any]]:
        """Main scraping method to be implemented by subclasses"""
        pass
    
    def get_page(self, url: str, retries: int = 3) -> BeautifulSoup:
        """Get page content with retry logic"""
        for attempt in range(retries):
            try:
                response = self.session.get(url, timeout=30)
                response.raise_for_status()
                
                # Add random delay to be respectful
                time.sleep(random.uniform(1, 3))
                
                return BeautifulSoup(response.content, 'html.parser')
                
            except requests.RequestException as e:
                logger.warning(f"Attempt {attempt + 1} failed for {url}: {str(e)}")
                if attempt == retries - 1:
                    logger.error(f"Failed to get {url} after {retries} attempts")
                    raise
                time.sleep(random.uniform(2, 5))
        
        return None
    
    def clean_text(self, text: str) -> str:
        """Clean and normalize text"""
        if not text:
            return ""
        
        # Remove extra whitespace and normalize
        text = ' '.join(text.split())
        return text.strip()
    
    def extract_date(self, date_str: str) -> datetime:
        """Extract and parse date from string"""
        try:
            # Common date formats
            formats = [
                '%Y-%m-%d',
                '%d/%m/%Y',
                '%m/%d/%Y',
                '%d-%m-%Y',
                '%Y-%m-%d %H:%M:%S',
                '%d/%m/%Y %H:%M',
                '%B %d, %Y',
                '%d %B %Y'
            ]
            
            for fmt in formats:
                try:
                    return datetime.strptime(date_str.strip(), fmt)
                except ValueError:
                    continue
            
            # If no format matches, return current date
            logger.warning(f"Could not parse date: {date_str}")
            return datetime.utcnow()
            
        except Exception as e:
            logger.error(f"Error parsing date {date_str}: {str(e)}")
            return datetime.utcnow()
    
    def extract_budget(self, budget_str: str) -> tuple:
        """Extract budget amount and currency from string"""
        if not budget_str:
            return None, None
        
        try:
            # Remove common words and symbols
            budget_str = budget_str.replace(',', '').replace('$', '').replace('USD', '').replace('EUR', '')
            budget_str = budget_str.replace('Naira', 'NGN').replace('Shilling', 'KES').replace('Cedi', 'GHS')
            
            # Extract currency
            currency = None
            if 'NGN' in budget_str or 'Naira' in budget_str:
                currency = 'NGN'
            elif 'KES' in budget_str or 'Shilling' in budget_str:
                currency = 'KES'
            elif 'GHS' in budget_str or 'Cedi' in budget_str:
                currency = 'GHS'
            elif 'USD' in budget_str or '$' in budget_str:
                currency = 'USD'
            elif 'EUR' in budget_str:
                currency = 'EUR'
            else:
                currency = 'USD'  # Default
            
            # Extract amount
            import re
            amount_match = re.search(r'[\d,]+\.?\d*', budget_str)
            if amount_match:
                amount = float(amount_match.group().replace(',', ''))
                return str(int(amount)), currency
            
            return None, currency
            
        except Exception as e:
            logger.error(f"Error extracting budget from {budget_str}: {str(e)}")
            return None, None
    
    def validate_tender(self, tender: Dict[str, Any]) -> bool:
        """Validate tender data"""
        required_fields = ['title', 'description', 'organization']
        
        for field in required_fields:
            if not tender.get(field):
                logger.warning(f"Missing required field: {field}")
                return False
        
        # Ensure title is not too short
        if len(tender['title']) < 10:
            logger.warning(f"Title too short: {tender['title']}")
            return False
        
        return True
    
    def normalize_tender(self, tender: Dict[str, Any]) -> Dict[str, Any]:
        """Normalize tender data structure"""
        normalized = {
            'title': self.clean_text(tender.get('title', '')),
            'description': self.clean_text(tender.get('description', '')),
            'organization': self.clean_text(tender.get('organization', '')),
            'country': tender.get('country', ''),
            'category': tender.get('category', ''),
            'status': tender.get('status', 'Open'),
            'budget': tender.get('budget'),
            'currency': tender.get('currency', 'USD'),
            'requirements': tender.get('requirements', []),
            'contact_email': tender.get('contact_email', ''),
            'contact_phone': tender.get('contact_phone', ''),
            'website': tender.get('website', ''),
            'created_at': datetime.utcnow()
        }
        
        # Handle deadline
        if tender.get('deadline'):
            if isinstance(tender['deadline'], str):
                normalized['deadline'] = self.extract_date(tender['deadline'])
            else:
                normalized['deadline'] = tender['deadline']
        
        return normalized 