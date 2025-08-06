# AfriOffres - African Job Opportunities Platform

A comprehensive web platform designed to centralize access to public job offers across Africa. The platform aggregates data from multiple government and institutional websites, providing users with advanced search and filtering tools, personalized recommendations, and notification features.

## 🏗️ Project Structure

```
AfriOffres/
├── frontend/          # React.js frontend application
├── backend/           # Flask REST API
├── scrapers/          # Web scraping services
├── data/              # Sample data and fixtures
├── docs/              # Project documentation
└── README.md          # This file
```

## 🚀 Quick Start

### Prerequisites
- Python 3.8+
- Node.js 16+
- MongoDB
- Git

### Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

### Scrapers Setup
```bash
cd scrapers
pip install -r requirements.txt
python main.py
```

## 📋 Features

- **Centralized Job Database**: Aggregates job offers from multiple African government and institutional sources
- **Advanced Search & Filtering**: Powerful search capabilities with multiple filter options
- **User Authentication**: Secure JWT-based authentication system
- **Personalized Recommendations**: AI-driven job recommendations based on user preferences
- **Real-time Notifications**: Email and in-app notifications for new job opportunities
- **Responsive Design**: Mobile-friendly interface for all devices

## 🔧 Technology Stack

### Backend
- **Framework**: Flask (Python)
- **Database**: MongoDB
- **Authentication**: JWT
- **API**: RESTful endpoints

### Frontend
- **Framework**: React.js
- **State Management**: Redux Toolkit
- **UI Library**: Material-UI
- **HTTP Client**: Axios

### Scrapers
- **Web Scraping**: BeautifulSoup, Scrapy
- **Data Processing**: Pandas
- **Scheduling**: APScheduler

## 📚 Documentation

- [API Documentation](./docs/api.md)
- [Setup Guide](./docs/setup.md)
- [Architecture Decisions](./docs/architecture.md)
- [Deployment Guide](./docs/deployment.md)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 