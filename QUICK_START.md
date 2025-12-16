# Quick Start Guide

## 🎯 What You Need to Do

Complete **3 simple tasks** (2-3 hours):

### Task 1: Login Screen
**File:** `mobile/src/screens/LoginScreen.tsx`

The login form is already built! You just need to:
- Implement the `handleLogin` function
- Call `login(email, password)` from `useAuth()`
- Show loading and error states

**Look for:** `// TODO: Task 1` comment in the file

---

### Task 2: Goals List
**File:** `mobile/src/screens/GoalsScreen.tsx`

The goals list UI is already built! You just need to:
- Implement the `loadGoals` function
- Call `goalService.getGoals()` to fetch data
- Update the goals state

**Look for:** `// TODO: Task 2` comment in the file

---

### Task 3: Navigation
**File:** `mobile/src/navigation/AppNavigator.tsx`

The navigation structure is already set up! You just need to:
- Get `isAuthenticated` from `useAuth()` hook
- Replace the hardcoded `false`

**Look for:** `// TODO: Task 3` comment in the file

---

## 🚀 Setup (5 minutes)

1. **Backend:**
   ```bash
   cd backend
   npm install
   cp env.example .env
   npm run dev
   ```

2. **Mobile:**
   ```bash
   cd mobile
   npm install
   # Update API_BASE_URL in src/services/api.ts if needed
   npm start
   ```

3. **Test Login:**
   - Email: `demo@careerontrack.ai`
   - Password: `demo123`

## ✅ Done!

Once all 3 tasks work, you're done! Submit your pull request.

