# Assessment Instructions for Candidates

## Welcome! 👋

Thank you for applying to the Senior React Native Mobile Developer position at CareerOnTrack.ai.

This assessment is designed to evaluate your skills in:
- React Native and Expo development
- API integration
- UI/UX implementation
- Code quality and best practices

## Quick Start

1. **Clone this repository**
2. **Set up the backend:**
   ```bash
   cd backend
   npm install
   cp env.example .env
   npm run dev
   ```

3. **Set up the mobile app:**
   ```bash
   cd mobile
   npm install
   npm start
   ```

4. **Test the backend API:**
   - The API runs on `http://localhost:3000`
   - Demo credentials: `demo@careerontrack.ai` / `demo123`
   - Test with Postman or curl to verify it's working

5. **Run the mobile app:**
   - Use Expo Go app on your phone, or
   - Press `i` for iOS simulator, `a` for Android emulator

## Important Notes

- Configure `API_BASE_URL` in `mobile/src/services/api.ts` based on your development environment
- The default `localhost` may need to be adjusted for emulators or physical devices

## Tasks Overview

You need to complete **3 simple tasks**:

1. ✅ **Login Screen** - Connect the login button to the API (UI is already done!)
2. ✅ **Goals List** - Fetch and display goals from the API (UI is already done!)
3. ✅ **Navigation** - Connect authentication state to navigation (just one line!)

Each file has clear TODO comments with step-by-step instructions. The UI is already built, you just need to connect the API calls!

## Evaluation Criteria

- **Functionality (40%)** - Does everything work?
- **Code Quality (30%)** - Clean, readable, well-organized code
- **UI/UX (20%)** - Intuitive, polished interface
- **Best Practices (10%)** - Proper state management, security, performance

## Submission

1. Complete all tasks
2. Test on both iOS and Android
3. Create a pull request with:
   - Brief description of your implementation
   - Screenshots or screen recordings
   - Any additional features you added
   - Notes on challenges faced

## Time Estimate

This should take **2-3 hours**. The tasks are simple and focused on core React Native API integration skills.

## Questions?

If you have questions, don't hesitate to reach out!

Good luck! 🚀

