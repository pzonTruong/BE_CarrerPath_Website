import cors from 'cors';
import express from 'express';
import rateLimit from 'express-rate-limit';
import { env } from './config/env';
import { errorMiddleware } from './middlewares/error.middleware';
import { authRouter } from './routes/auth.route';
import { profileRouter } from './routes/profile.route';
import { progressRouter } from './routes/progress.route';
import { roadmapRouter } from './routes/roadmap.route';
import { usersRouter } from './routes/users.route';
import { testRouter } from './routes/test.route';
import { quizRouter } from './routes/quiz.route';
import { adminRouter } from './routes/admin.route';

export const app = express();

const allowedOrigins = new Set([
  env.clientUrl,
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:5174',
  'http://127.0.0.1:5174',
  'http://localhost:5175',
  'http://127.0.0.1:5175',
  'http://localhost:5176',
  'http://127.0.0.1:5176',
  'http://localhost:5177',
  'http://127.0.0.1:5177',
  'http://localhost:5178',
  'http://127.0.0.1:5178',
  'http://localhost:5179',
  'http://127.0.0.1:5179'
]);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.has(origin)) {
      return callback(null, true);
    }

    return callback(new Error(`CORS blocked origin: ${origin}`));
  }
}));
app.use(express.json());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 300 }));

app.get('/health', (_req, res) => res.json({ ok: true }));
app.use('/api/auth', authRouter);
app.use('/api/profile', profileRouter);
app.use('/api/roadmaps', roadmapRouter);
app.use('/api/users', usersRouter);
app.use('/api/progress', progressRouter);
app.use('/api/test', testRouter);
app.use('/api/quizzes', quizRouter);
app.use('/api/admin', adminRouter);
app.use(errorMiddleware);

export default app;
