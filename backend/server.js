import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Import routes
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import goalRoutes from './routes/goals.js';

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/goals', goalRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'CareerOnTrack API is running' });
});

// Start server - Listen on all network interfaces (0.0.0.0) to allow connections from mobile devices
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`🌐 Also accessible at http://192.168.0.100:${PORT}`);
  console.log(`📱 API ready for mobile app integration`);
});

