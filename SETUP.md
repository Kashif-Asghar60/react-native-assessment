# Setup Guide

## Prerequisites

- Node.js 18+ installed
- npm or yarn
- Expo CLI (`npm install -g expo-cli` or use `npx expo`)
- iOS Simulator (Mac) or Android Emulator / Physical device with Expo Go app

## Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
# On Windows (PowerShell)
Copy-Item env.example .env

# On Mac/Linux
cp env.example .env
```

4. Start the server:
```bash
npm run dev
```

The API will be available at `http://localhost:3000`

### Test the Backend

You can test the API with curl or Postman:

```bash
# Health check
curl http://localhost:3000/api/health

# Login (demo credentials)
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"demo@careerontrack.ai","password":"demo123"}'
```

## Mobile App Setup

1. Navigate to mobile directory:
```bash
cd mobile
```

2. Install dependencies:
```bash
npm install
```

3. **IMPORTANT: Configure API URL**

   Edit `mobile/src/services/api.ts` and set the `API_BASE_URL` based on your development environment:
   ```typescript
   const API_BASE_URL = __DEV__ 
     ? 'http://localhost:3000/api'  // Adjust based on your setup
     : 'https://api.careerontrack.ai/api';
   ```
   
   Note: You may need to adjust the URL depending on whether you're using an emulator, simulator, or physical device.

4. Start Expo:
```bash
npm start
```

5. Run the app:
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan QR code with Expo Go app on your phone

## Demo Credentials

- **Email:** `demo@careerontrack.ai`
- **Password:** `demo123`

## Troubleshooting

### Backend not connecting
- Make sure backend is running on port 3000
- Check firewall settings
- Verify API_BASE_URL is correct for your setup

### Expo issues
- Clear cache: `npx expo start -c`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Check Expo CLI version: `npx expo --version`

### Port already in use
- Change PORT in backend `.env` file
- Update API_BASE_URL in mobile app accordingly

## Next Steps

Once everything is set up, read `README.md` for the assessment tasks!

