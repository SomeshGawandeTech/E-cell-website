import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db';

import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import eventRoutes from './routes/eventRoutes';
import startupRoutes from './routes/startupRoutes';
import mentorRoutes from './routes/mentorRoutes';
import blogRoutes from './routes/blogRoutes';
import resourceRoutes from './routes/resourceRoutes';
import notificationRoutes from './routes/notificationRoutes';
import analyticsRoutes from './routes/analyticsRoutes';
import aiRoutes from './routes/aiRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS
app.use(
  cors({
    origin: '*',
    credentials: true,
  })
);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Connect Database
connectDB();

// API Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    app: 'COETA E-Cell Portal REST API',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
});

// Root route: redirect to health check for simple browser access
app.get('/', (req, res) => {
  res.redirect('/api/health');
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/startups', startupRoutes);
app.use('/api/mentors', mentorRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/ai', aiRoutes);

// Global Error Handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('[Backend Server Error]', err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

app.listen(PORT, () => {
  console.log(`\n⚡ [COETA E-Cell Backend API Server] running on http://localhost:${PORT}`);
  console.log(`📡 Healthcheck endpoint: http://localhost:${PORT}/api/health\n`);
});
