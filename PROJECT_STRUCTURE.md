# Project Structure

```
CareerOnTrack/
├── backend/                    # Node.js/Express Backend API
│   ├── middleware/
│   │   └── auth.js            # JWT authentication middleware
│   ├── routes/
│   │   ├── auth.js            # Authentication routes (login, register)
│   │   ├── users.js           # User profile routes
│   │   └── goals.js           # Career goals routes
│   ├── server.js              # Express server setup
│   ├── package.json
│   ├── env.example            # Environment variables template
│   └── README.md              # Backend API documentation
│
├── mobile/                     # Expo React Native App
│   ├── src/
│   │   ├── components/        # Reusable components
│   │   │   ├── LoadingSpinner.tsx
│   │   │   └── ErrorBoundary.tsx
│   │   ├── context/
│   │   │   └── AuthContext.tsx    # Authentication context
│   │   ├── navigation/
│   │   │   ├── AppNavigator.tsx   # Main navigation (TODO: Task 5)
│   │   │   └── types.ts            # Navigation types
│   │   ├── screens/
│   │   │   ├── LoginScreen.tsx     # TODO: Task 1
│   │   │   ├── HomeScreen.tsx      # Basic home screen
│   │   │   ├── GoalsScreen.tsx     # TODO: Task 3
│   │   │   ├── GoalDetailScreen.tsx # TODO: Task 4
│   │   │   └── ProfileScreen.tsx    # TODO: Task 2
│   │   ├── services/
│   │   │   └── api.ts              # API service layer
│   │   └── theme/
│   │       ├── colors.ts            # Color palette
│   │       └── typography.ts        # Typography styles
│   ├── App.tsx                 # Root component
│   ├── package.json
│   ├── tsconfig.json
│   ├── app.json                # Expo configuration
│   └── babel.config.js
│
├── README.md                   # Main assessment instructions
├── ASSESSMENT_INSTRUCTIONS.md  # Detailed candidate instructions
├── SETUP.md                    # Setup guide
└── PROJECT_STRUCTURE.md         # This file
```

## Key Files to Complete

### Backend (Mostly Complete)
- ✅ All routes implemented
- ✅ Authentication working
- ✅ API endpoints ready

### Mobile App (3 Simple Tasks to Complete)

1. **LoginScreen.tsx** - Connect login button to API (UI already built)
2. **GoalsScreen.tsx** - Fetch and display goals (UI already built)
3. **AppNavigator.tsx** - Connect auth state to navigation (one line)

All UI components are pre-built. Candidates just need to implement API calls.

## API Endpoints

All endpoints are documented in `backend/README.md`

### Authentication
- `POST /api/auth/login`
- `POST /api/auth/register`

### User Profile
- `GET /api/users/profile` (requires auth)
- `PUT /api/users/profile` (requires auth)

### Career Goals
- `GET /api/goals` (requires auth)
- `GET /api/goals/:id` (requires auth)
- `POST /api/goals` (requires auth)
- `PUT /api/goals/:id` (requires auth)
- `DELETE /api/goals/:id` (requires auth)

## Development Workflow

1. Start backend: `cd backend && npm run dev`
2. Start mobile: `cd mobile && npm start`
3. Complete tasks in order (1-7)
4. Test on both iOS and Android
5. Submit pull request

