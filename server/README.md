# FoodLink Backend Server

This is the backend server for the FoodLink application. It provides API endpoints for user authentication, NGO management, and other features.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory with the following variables:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/foodlink
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```

3. Make sure MongoDB is installed and running on your system.

## Running the Server

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register a new user
- POST `/api/auth/login` - Login user

### Users
- GET `/api/users/profile` - Get user profile (protected)
- PUT `/api/users/profile` - Update user profile (protected)

### NGOs
- GET `/api/ngos` - Get all NGOs
- GET `/api/ngos/:id` - Get NGO by ID
- PUT `/api/ngos/:id` - Update NGO profile (protected)

## Security Features

- JWT Authentication
- Password Hashing
- CORS Protection
- Helmet Security Headers
- Request Logging 