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

export const app = express();

app.use(cors({ origin: env.clientUrl }));
app.use(express.json());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 300 }));

app.get('/health', (_req, res) => res.json({ ok: true }));
app.use('/api/auth', authRouter);
app.use('/api/profile', profileRouter);
app.use('/api/roadmaps', roadmapRouter);
app.use('/api/users', usersRouter);
app.use('/api/progress', progressRouter);
app.use(errorMiddleware);

export default app;
