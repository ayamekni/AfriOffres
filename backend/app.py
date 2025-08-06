from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from pymongo import MongoClient
from bson import ObjectId
import bcrypt
import os
from datetime import datetime, timedelta
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'your-secret-key-change-in-production')
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=24)

# Initialize extensions
jwt = JWTManager(app)
CORS(app)

# MongoDB connection
client = MongoClient(os.getenv('MONGODB_URI', 'mongodb://localhost:27017/'))
db = client.afrioffres
tenders_collection = db.tenders
users_collection = db.users

# Helper functions
def serialize_tender(tender):
    """Convert MongoDB document to JSON serializable format"""
    tender['_id'] = str(tender['_id'])
    if 'created_at' in tender:
        tender['created_at'] = tender['created_at'].isoformat()
    if 'deadline' in tender:
        tender['deadline'] = tender['deadline'].isoformat()
    return tender

def serialize_user(user):
    """Convert user document to JSON serializable format"""
    user['_id'] = str(user['_id'])
    if 'created_at' in user:
        user['created_at'] = user['created_at'].isoformat()
    user.pop('password', None)  # Remove password from response
    return user

# Authentication routes
@app.route('/api/auth/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['email', 'password', 'first_name', 'last_name']
        for field in required_fields:
            if not data.get(field):
                return jsonify({'error': f'{field} is required'}), 400
        
        # Check if user already exists
        existing_user = users_collection.find_one({'email': data['email']})
        if existing_user:
            return jsonify({'error': 'User already exists'}), 409
        
        # Hash password
        hashed_password = bcrypt.hashpw(data['password'].encode('utf-8'), bcrypt.gensalt())
        
        # Create user
        user = {
            'email': data['email'],
            'password': hashed_password,
            'first_name': data['first_name'],
            'last_name': data['last_name'],
            'created_at': datetime.utcnow(),
            'preferences': data.get('preferences', {}),
            'notifications_enabled': data.get('notifications_enabled', True)
        }
        
        result = users_collection.insert_one(user)
        user['_id'] = result.inserted_id
        
        # Create access token
        access_token = create_access_token(identity=str(user['_id']))
        
        return jsonify({
            'message': 'User registered successfully',
            'access_token': access_token,
            'user': serialize_user(user)
        }), 201
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/auth/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        
        if not data.get('email') or not data.get('password'):
            return jsonify({'error': 'Email and password are required'}), 400
        
        # Find user
        user = users_collection.find_one({'email': data['email']})
        if not user:
            return jsonify({'error': 'Invalid credentials'}), 401
        
        # Check password
        if not bcrypt.checkpw(data['password'].encode('utf-8'), user['password']):
            return jsonify({'error': 'Invalid credentials'}), 401
        
        # Create access token
        access_token = create_access_token(identity=str(user['_id']))
        
        return jsonify({
            'message': 'Login successful',
            'access_token': access_token,
            'user': serialize_user(user)
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Tender routes
@app.route('/api/tenders', methods=['GET'])
def get_tenders():
    try:
        # Get query parameters
        page = int(request.args.get('page', 1))
        limit = int(request.args.get('limit', 10))
        search = request.args.get('search', '')
        country = request.args.get('country', '')
        category = request.args.get('category', '')
        status = request.args.get('status', '')
        
        # Build filter
        filter_query = {}
        if search:
            filter_query['$or'] = [
                {'title': {'$regex': search, '$options': 'i'}},
                {'description': {'$regex': search, '$options': 'i'}},
                {'organization': {'$regex': search, '$options': 'i'}}
            ]
        if country:
            filter_query['country'] = country
        if category:
            filter_query['category'] = category
        if status:
            filter_query['status'] = status
        
        # Get total count
        total = tenders_collection.count_documents(filter_query)
        
        # Get tenders with pagination
        skip = (page - 1) * limit
        tenders = list(tenders_collection.find(filter_query).skip(skip).limit(limit).sort('created_at', -1))
        
        # Serialize tenders
        serialized_tenders = [serialize_tender(tender) for tender in tenders]
        
        return jsonify({
            'tenders': serialized_tenders,
            'pagination': {
                'page': page,
                'limit': limit,
                'total': total,
                'pages': (total + limit - 1) // limit
            }
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/tenders/<tender_id>', methods=['GET'])
def get_tender(tender_id):
    try:
        tender = tenders_collection.find_one({'_id': ObjectId(tender_id)})
        if not tender:
            return jsonify({'error': 'Tender not found'}), 404
        
        return jsonify(serialize_tender(tender)), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/tenders/categories', methods=['GET'])
def get_categories():
    try:
        categories = tenders_collection.distinct('category')
        return jsonify({'categories': categories}), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/tenders/countries', methods=['GET'])
def get_countries():
    try:
        countries = tenders_collection.distinct('country')
        return jsonify({'countries': countries}), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# User routes
@app.route('/api/user/profile', methods=['GET'])
@jwt_required()
def get_profile():
    try:
        user_id = get_jwt_identity()
        user = users_collection.find_one({'_id': ObjectId(user_id)})
        
        if not user:
            return jsonify({'error': 'User not found'}), 404
        
        return jsonify(serialize_user(user)), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/user/profile', methods=['PUT'])
@jwt_required()
def update_profile():
    try:
        user_id = get_jwt_identity()
        data = request.get_json()
        
        # Update allowed fields
        update_data = {}
        allowed_fields = ['first_name', 'last_name', 'preferences', 'notifications_enabled']
        
        for field in allowed_fields:
            if field in data:
                update_data[field] = data[field]
        
        if not update_data:
            return jsonify({'error': 'No valid fields to update'}), 400
        
        result = users_collection.update_one(
            {'_id': ObjectId(user_id)},
            {'$set': update_data}
        )
        
        if result.modified_count == 0:
            return jsonify({'error': 'User not found'}), 404
        
        # Get updated user
        user = users_collection.find_one({'_id': ObjectId(user_id)})
        return jsonify(serialize_user(user)), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/user/recommendations', methods=['GET'])
@jwt_required()
def get_recommendations():
    try:
        user_id = get_jwt_identity()
        user = users_collection.find_one({'_id': ObjectId(user_id)})
        
        if not user:
            return jsonify({'error': 'User not found'}), 404
        
        # Simple recommendation based on user preferences
        preferences = user.get('preferences', {})
        filter_query = {}
        
        if preferences.get('categories'):
            filter_query['category'] = {'$in': preferences['categories']}
        
        if preferences.get('countries'):
            filter_query['country'] = {'$in': preferences['countries']}
        
        # Get recommended tenders
        recommendations = list(tenders_collection.find(filter_query).limit(5).sort('created_at', -1))
        serialized_recommendations = [serialize_tender(tender) for tender in recommendations]
        
        return jsonify({'recommendations': serialized_recommendations}), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Health check
@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy', 'message': 'AfriOffres API is running'}), 200

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000) 