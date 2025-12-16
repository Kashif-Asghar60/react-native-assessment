# CareerOnTrack.ai - Mobile Developer Assessment

Welcome to the CareerOnTrack.ai mobile developer assessment! This repository contains a partially implemented mobile app that you'll need to complete.

## 📋 Overview

This assessment evaluates your ability to:
- Work with React Native and Expo
- Integrate with REST APIs
- Implement UI/UX from requirements
- Write clean, maintainable code
- Handle authentication and user flows

## 🏗️ Project Structure

```
CareerOnTrack/
├── backend/          # Node.js/Express API (mostly implemented)
├── mobile/           # Expo React Native app (your tasks here)
└── README.md         # This file
```

## 🚀 Getting Started

> **📖 For detailed setup instructions, see [SETUP.md](./SETUP.md)**

### Quick Start

1. **Backend Setup:**
   ```bash
   cd backend
   npm install
   cp env.example .env  # or Copy-Item env.example .env on Windows
   npm run dev
   ```

2. **Mobile App Setup:**
   ```bash
   cd mobile
   npm install
   # IMPORTANT: Configure API_BASE_URL in src/services/api.ts for your setup
   npm start
   ```

3. **Demo Credentials:**
   - Email: `demo@careerontrack.ai`
   - Password: `demo123`

> ⚠️ **Important:** Configure the API URL in `mobile/src/services/api.ts` based on your setup. See [SETUP.md](./SETUP.md) for details.

## 📝 Assessment Tasks

You need to complete **3 simple tasks** in the mobile app:

### Task 1: Complete Login Screen ✅
**Location:** `mobile/src/screens/LoginScreen.tsx`

**What to do:**
- The login form UI is already created, you just need to:
  1. Connect the login button to call `authService.login(email, password)`
  2. Show a loading indicator while logging in
  3. Display error message if login fails
  4. On success, the app should automatically navigate (navigation is handled by AppNavigator)

**API Endpoint:**
```
POST /api/auth/login
Body: { email: string, password: string }
Response: { token: string, user: { id, email, name } }
```

**Hint:** Use the `login` function from `useAuth()` hook. The form validation is already done!

---

### Task 2: Display Goals List ✅
**Location:** `mobile/src/screens/GoalsScreen.tsx`

**What to do:**
- Fetch goals from the API when the screen loads
- Display the goals in a list
- Show a loading indicator while fetching
- Show an error message if the API call fails

**API Endpoint:**
```
GET /api/goals (requires auth token)
Response: { goals: [{ id, title, description, status, progress }] }
```

**Hint:** Use `goalService.getGoals()` from `src/services/api.ts`. The UI is already set up, you just need to fetch and display the data!

---

### Task 3: Complete Navigation ✅
**Location:** `mobile/src/navigation/AppNavigator.tsx`

**What to do:**
- The navigation structure is set up, you just need to:
  1. Get the `isAuthenticated` value from `useAuth()` hook
  2. Replace the hardcoded `false` with the actual auth state
  3. That's it! The navigation will automatically show Login or Main screens

**Hint:** Just uncomment the line and use `const { isAuthenticated } = useAuth();`

## 🎯 Evaluation Criteria

Your submission will be evaluated on:

1. **Functionality** (50%)
   - All 3 tasks completed and working
   - Proper API integration
   - Basic error handling

2. **Code Quality** (30%)
   - Clean, readable code
   - Proper use of hooks and components
   - No console.logs or commented code

3. **UI/UX** (20%)
   - Loading states work
   - Error messages are shown
   - App flows smoothly

## 📤 Submission Instructions

1. Fork this repository
2. Complete all the tasks
3. Test thoroughly on both iOS and Android
4. Create a pull request with:
   - Brief description of your implementation
   - Any additional features you added
   - Screenshots or screen recordings
   - Notes on any challenges faced

## ⏱️ Time Estimate

This assessment should take approximately **2-3 hours** to complete. The tasks are simple and focused on core React Native skills.

## 🆘 Need Help?

- Backend API documentation: See `backend/README.md`
- Expo documentation: https://docs.expo.dev
- React Navigation: https://reactnavigation.org

## 📧 Questions?

If you have any questions about the assessment, please reach out to us.

Good luck! 🚀

