# Backend Architecture

## Overview

The backend follows the **MVC (Model-View-Controller)** pattern with clear separation of concerns.

## Directory Structure

```
backend/
├── controllers/          # Business logic layer
│   ├── authController.js    # Authentication logic
│   ├── userController.js    # User profile logic
│   └── goalController.js    # Career goals logic
│
├── middleware/           # Express middleware
│   ├── auth.js              # JWT authentication middleware
│   └── validation.js        # Request validation middleware
│
├── models/               # Data layer
│   └── data.js              # Mock database (users & goals)
│
├── routes/               # API routes (thin layer)
│   ├── auth.js              # Authentication routes
│   ├── users.js             # User profile routes
│   └── goals.js             # Career goals routes
│
└── server.js            # Express app entry point
```

## Architecture Pattern

### Routes (Thin Layer)
- Define API endpoints
- Apply validation rules
- Apply middleware (auth, validation)
- Call controller functions

**Example:**
```javascript
router.post('/login', 
  [body('email').isEmail(), body('password').notEmpty(), handleValidationErrors],
  authController.login
);
```

### Controllers (Business Logic)
- Handle request/response
- Process business logic
- Interact with models
- Return appropriate responses

**Example:**
```javascript
const login = async (req, res) => {
  const { email, password } = req.body;
  // Business logic here
  const user = users.find(u => u.email === email);
  // ... authentication logic
  res.json({ token, user });
};
```

### Models (Data Layer)
- Store data structures
- Provide data access
- In production: database queries, ORM models

**Example:**
```javascript
module.exports = {
  users: [...],
  goals: [...]
};
```

### Middleware
- **auth.js**: JWT token verification
- **validation.js**: Request validation error handling

## Data Flow

```
Request → Route → Middleware → Controller → Model → Controller → Response
```

1. **Request** arrives at route
2. **Route** applies validation and auth middleware
3. **Controller** processes business logic
4. **Model** provides data access
5. **Controller** formats response
6. **Response** sent back to client

## Benefits

✅ **Separation of Concerns**: Each layer has a single responsibility
✅ **Maintainability**: Easy to find and modify code
✅ **Testability**: Controllers can be tested independently
✅ **Scalability**: Easy to add new features
✅ **Clean Code**: Routes are thin, logic is in controllers

## Migration to Production

When moving to production:

1. **Models**: Replace `models/data.js` with database models (Mongoose, Sequelize, etc.)
2. **Controllers**: Add database queries instead of in-memory arrays
3. **Middleware**: Add rate limiting, logging, error handling
4. **Routes**: Add API versioning, documentation

## Example: Adding a New Endpoint

1. **Add route** in `routes/`:
```javascript
router.get('/new-endpoint', authenticateToken, newController.getData);
```

2. **Add controller** in `controllers/`:
```javascript
const getData = (req, res) => {
  // Business logic
  res.json({ data: ... });
};
```

3. **Update model** if needed in `models/`

That's it! Clean and organized.

