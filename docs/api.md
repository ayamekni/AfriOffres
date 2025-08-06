# AfriOffres API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication

### Register User
**POST** `/auth/register`

Register a new user account.

**Request Body:**
```json
{
  "first_name": "John",
  "last_name": "Doe",
  "email": "john.doe@example.com",
  "password": "securepassword123",
  "preferences": {
    "categories": ["Technology", "Healthcare"],
    "countries": ["Nigeria", "Kenya"]
  },
  "notifications_enabled": true
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "first_name": "John",
    "last_name": "Doe",
    "email": "john.doe@example.com",
    "preferences": {
      "categories": ["Technology", "Healthcare"],
      "countries": ["Nigeria", "Kenya"]
    },
    "notifications_enabled": true,
    "created_at": "2024-01-15T10:00:00Z"
  }
}
```

### Login User
**POST** `/auth/login`

Authenticate user and get access token.

**Request Body:**
```json
{
  "email": "john.doe@example.com",
  "password": "securepassword123"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "first_name": "John",
    "last_name": "Doe",
    "email": "john.doe@example.com"
  }
}
```

## Tenders

### Get All Tenders
**GET** `/tenders`

Get paginated list of tenders with optional filtering.

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `search` (optional): Search term for title, description, or organization
- `country` (optional): Filter by country
- `category` (optional): Filter by category
- `status` (optional): Filter by status

**Response:**
```json
{
  "tenders": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Software Development Consultant",
      "description": "The Ministry of Digital Transformation is seeking...",
      "organization": "Ministry of Digital Transformation",
      "country": "Nigeria",
      "category": "Technology",
      "status": "Open",
      "deadline": "2024-02-15T23:59:59Z",
      "budget": "500000",
      "currency": "USD",
      "requirements": [
        "Minimum 5 years experience in software development",
        "Experience with React, Node.js, and MongoDB"
      ],
      "contact_email": "procurement@digital.gov.ng",
      "contact_phone": "+234-1-234-5678",
      "website": "https://digital.gov.ng",
      "created_at": "2024-01-15T10:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 150,
    "pages": 15
  }
}
```

### Get Tender by ID
**GET** `/tenders/{id}`

Get detailed information about a specific tender.

**Response:**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "title": "Software Development Consultant",
  "description": "The Ministry of Digital Transformation is seeking...",
  "organization": "Ministry of Digital Transformation",
  "country": "Nigeria",
  "category": "Technology",
  "status": "Open",
  "deadline": "2024-02-15T23:59:59Z",
  "budget": "500000",
  "currency": "USD",
  "requirements": [
    "Minimum 5 years experience in software development",
    "Experience with React, Node.js, and MongoDB"
  ],
  "contact_email": "procurement@digital.gov.ng",
  "contact_phone": "+234-1-234-5678",
  "website": "https://digital.gov.ng",
  "created_at": "2024-01-15T10:00:00Z"
}
```

### Get Categories
**GET** `/tenders/categories`

Get list of all available categories.

**Response:**
```json
{
  "categories": ["Technology", "Infrastructure", "Healthcare", "Agriculture", "Education", "Energy"]
}
```

### Get Countries
**GET** `/tenders/countries`

Get list of all available countries.

**Response:**
```json
{
  "countries": ["Nigeria", "Kenya", "Ghana", "South Africa", "Ethiopia"]
}
```

## User Management

### Get User Profile
**GET** `/user/profile`

Get current user's profile information.

**Headers:**
```
Authorization: Bearer {access_token}
```

**Response:**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "first_name": "John",
  "last_name": "Doe",
  "email": "john.doe@example.com",
  "preferences": {
    "categories": ["Technology", "Healthcare"],
    "countries": ["Nigeria", "Kenya"]
  },
  "notifications_enabled": true,
  "created_at": "2024-01-15T10:00:00Z"
}
```

### Update User Profile
**PUT** `/user/profile`

Update current user's profile information.

**Headers:**
```
Authorization: Bearer {access_token}
```

**Request Body:**
```json
{
  "first_name": "John",
  "last_name": "Smith",
  "preferences": {
    "categories": ["Technology", "Infrastructure"],
    "countries": ["Nigeria", "Ghana"]
  },
  "notifications_enabled": false
}
```

### Get User Recommendations
**GET** `/user/recommendations`

Get personalized tender recommendations based on user preferences.

**Headers:**
```
Authorization: Bearer {access_token}
```

**Response:**
```json
{
  "recommendations": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Software Development Consultant",
      "description": "The Ministry of Digital Transformation is seeking...",
      "organization": "Ministry of Digital Transformation",
      "country": "Nigeria",
      "category": "Technology"
    }
  ]
}
```

## Health Check

### API Health
**GET** `/health`

Check if the API is running.

**Response:**
```json
{
  "status": "healthy",
  "message": "AfriOffres API is running"
}
```

## Error Responses

All endpoints may return the following error responses:

**400 Bad Request:**
```json
{
  "error": "Validation error message"
}
```

**401 Unauthorized:**
```json
{
  "error": "Invalid credentials"
}
```

**404 Not Found:**
```json
{
  "error": "Resource not found"
}
```

**500 Internal Server Error:**
```json
{
  "error": "Internal server error"
}
```

## Authentication

Most endpoints require authentication using JWT tokens. Include the token in the Authorization header:

```
Authorization: Bearer {access_token}
```

Tokens expire after 24 hours and must be refreshed by logging in again. 