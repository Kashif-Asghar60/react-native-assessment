# CareerOnTrack Backend API

This is the backend API for CareerOnTrack.ai mobile app assessment.

## Project Structure

```
backend/
├── controllers/        # Business logic
│   ├── authController.js
│   ├── userController.js
│   └── goalController.js
├── middleware/         # Express middleware
│   ├── auth.js         # JWT authentication
│   └── validation.js   # Request validation
├── models/             # Data models
│   └── data.js         # Mock database
├── routes/             # API routes
│   ├── auth.js
│   ├── users.js
│   └── goals.js
└── server.js           # Express app entry point
```

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file from `env.example`:
```bash
cp env.example .env
```

3. Start the server:
```bash
npm run dev
```

The API will be available at `http://localhost:3000`

## API Endpoints

### Authentication

#### POST /api/auth/login
Login with email and password.

**Request:**
```json
{
  "email": "demo@careerontrack.ai",
  "password": "demo123"
}
```

**Response:**
```json
{
  "token": "jwt-token-here",
  "user": {
    "id": 1,
    "email": "demo@careerontrack.ai",
    "name": "Demo User"
  }
}
```

#### POST /api/auth/register
Register a new user.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

### User Profile

#### GET /api/users/profile
Get current user profile. Requires authentication.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "id": 1,
  "email": "demo@careerontrack.ai",
  "name": "Demo User",
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

#### PUT /api/users/profile
Update user profile. Requires authentication.

**Headers:**
```
Authorization: Bearer <token>
```

**Request:**
```json
{
  "name": "Updated Name",
  "email": "newemail@example.com"
}
```

### Career Goals

#### GET /api/goals
Get all goals for the authenticated user.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "goals": [
    {
      "id": 1,
      "title": "Become a Senior Developer",
      "description": "Advance to senior developer role within 12 months",
      "status": "in_progress",
      "progress": 60,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-15T00:00:00.000Z"
    }
  ]
}
```

#### GET /api/goals/:id
Get a specific goal by ID.

#### POST /api/goals
Create a new goal.

**Request:**
```json
{
  "title": "Learn TypeScript",
  "description": "Master TypeScript for better code quality",
  "status": "not_started"
}
```

#### PUT /api/goals/:id
Update a goal.

**Request:**
```json
{
  "title": "Updated Title",
  "status": "in_progress",
  "progress": 50
}
```

#### DELETE /api/goals/:id
Delete a goal.

## Authentication

All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <your-token>
```

## Demo Credentials

- Email: `demo@careerontrack.ai`
- Password: `demo123`

## Architecture

The backend follows MVC (Model-View-Controller) pattern:

- **Routes** (`routes/`) - Define API endpoints and validation rules
- **Controllers** (`controllers/`) - Handle business logic
- **Models** (`models/`) - Data structure and storage
- **Middleware** (`middleware/`) - Authentication and validation

## Notes

- This is a mock backend for assessment purposes
- Data is stored in memory and will reset on server restart
- In production, use a real database (PostgreSQL, MongoDB, etc.)
- JWT tokens expire after 7 days
