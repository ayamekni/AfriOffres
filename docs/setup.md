# AfriOffres Setup Guide

This guide will help you set up and run the AfriOffres platform locally.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Python 3.8+** - [Download Python](https://www.python.org/downloads/)
- **Node.js 16+** - [Download Node.js](https://nodejs.org/)
- **MongoDB** - [Download MongoDB](https://www.mongodb.com/try/download/community)
- **Git** - [Download Git](https://git-scm.com/)

## Project Structure

```
AfriOffres/
├── backend/          # Flask REST API
├── frontend/         # React.js frontend
├── scrapers/         # Web scraping services
├── data/             # Sample data and fixtures
├── docs/             # Documentation
└── README.md         # Project overview
```

## Backend Setup

### 1. Navigate to Backend Directory
```bash
cd backend
```

### 2. Create Virtual Environment
```bash
# On Windows
python -m venv venv
venv\Scripts\activate

# On macOS/Linux
python3 -m venv venv
source venv/bin/activate
```

### 3. Install Dependencies
```bash
pip install -r requirements.txt
```

### 4. Environment Configuration
Create a `.env` file in the backend directory:
```bash
# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/

# JWT Configuration
JWT_SECRET_KEY=your-super-secret-jwt-key-change-in-production

# Flask Configuration
FLASK_ENV=development
FLASK_DEBUG=True

# API Configuration
API_HOST=0.0.0.0
API_PORT=5000
```

### 5. Start MongoDB
Make sure MongoDB is running on your system:
```bash
# On Windows (if installed as a service)
# MongoDB should start automatically

# On macOS (if installed via Homebrew)
brew services start mongodb-community

# On Linux
sudo systemctl start mongod
```

### 6. Run the Backend
```bash
python app.py
```

The API will be available at `http://localhost:5000`

## Frontend Setup

### 1. Navigate to Frontend Directory
```bash
cd frontend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start the Frontend
```bash
npm start
```

The frontend will be available at `http://localhost:3000`

## Scrapers Setup

### 1. Navigate to Scrapers Directory
```bash
cd scrapers
```

### 2. Create Virtual Environment
```bash
# On Windows
python -m venv venv
venv\Scripts\activate

# On macOS/Linux
python3 -m venv venv
source venv/bin/activate
```

### 3. Install Dependencies
```bash
pip install -r requirements.txt
```

### 4. Run Scrapers
```bash
python main.py
```

This will load sample data and start the scraping scheduler.

## Database Setup

### 1. MongoDB Installation
If you haven't installed MongoDB:

**Windows:**
1. Download MongoDB Community Server from the official website
2. Run the installer and follow the setup wizard
3. MongoDB will be installed as a Windows service

**macOS:**
```bash
brew tap mongodb/brew
brew install mongodb-community
```

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install mongodb
```

### 2. Verify MongoDB Connection
```bash
# Connect to MongoDB shell
mongosh

# Or for older versions
mongo
```

### 3. Create Database
The application will automatically create the required database and collections when it first runs.

## Sample Data

The platform comes with sample data for testing:

1. **Sample Tenders**: Located in `data/sample_tenders.json`
2. **Mock Scrapers**: The scrapers include mock data for demonstration

To load sample data manually:
```bash
cd scrapers
python main.py
```

## Development Workflow

### 1. Start All Services
Open three terminal windows:

**Terminal 1 - Backend:**
```bash
cd backend
venv\Scripts\activate  # Windows
python app.py
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

**Terminal 3 - Scrapers:**
```bash
cd scrapers
venv\Scripts\activate  # Windows
python main.py
```

### 2. Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Documentation**: http://localhost:5000/api/health

### 3. Testing the API
You can test the API endpoints using tools like:
- **Postman**: Import the API collection
- **cURL**: Use command line requests
- **Browser**: Visit the health endpoint

## Configuration Options

### Backend Configuration
Edit `backend/config.py` or set environment variables:

```python
# MongoDB
MONGODB_URI=mongodb://localhost:27017/

# JWT Settings
JWT_SECRET_KEY=your-secret-key
JWT_ACCESS_TOKEN_EXPIRES=24h

# API Settings
API_HOST=0.0.0.0
API_PORT=5000
```

### Frontend Configuration
Edit `frontend/package.json` to change the proxy settings:

```json
{
  "proxy": "http://localhost:5000"
}
```

## Troubleshooting

### Common Issues

**1. MongoDB Connection Error**
```
Error: Could not connect to MongoDB
```
**Solution:**
- Ensure MongoDB is running
- Check the connection string in `.env`
- Verify MongoDB is listening on the correct port

**2. Port Already in Use**
```
Error: Address already in use
```
**Solution:**
- Change the port in the configuration
- Kill the process using the port
- Use different ports for different services

**3. Module Not Found**
```
Error: No module named 'flask'
```
**Solution:**
- Activate the virtual environment
- Reinstall dependencies: `pip install -r requirements.txt`

**4. Node Modules Issues**
```
Error: Cannot find module
```
**Solution:**
- Delete `node_modules` folder
- Run `npm install` again
- Clear npm cache: `npm cache clean --force`

### Logs and Debugging

**Backend Logs:**
- Check the terminal where the Flask app is running
- Enable debug mode in `.env`

**Frontend Logs:**
- Check browser developer tools
- Check the terminal where npm is running

**Scraper Logs:**
- Check `scrapers.log` file
- Monitor the scraper terminal output

## Production Deployment

For production deployment, consider:

1. **Environment Variables**: Use proper environment variables
2. **Database**: Use MongoDB Atlas or a production MongoDB instance
3. **Security**: Change default JWT secret and enable HTTPS
4. **Scaling**: Use process managers like PM2 or systemd
5. **Monitoring**: Implement logging and monitoring solutions

## Support

If you encounter issues:

1. Check the troubleshooting section above
2. Review the logs for error messages
3. Ensure all prerequisites are installed correctly
4. Verify network connectivity and firewall settings

For additional help, refer to the API documentation in `docs/api.md`. 