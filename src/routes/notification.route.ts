import { Router } from 'express';
import { authGuard } from '../middlewares/auth.middleware';
import * as notificationController from '../controllers/notification.controller';

export const notificationRouter = Router();

// Public / Vercel Cron Endpoint
notificationRouter.get('/vapid-key', notificationController.getVapidPublicKey);
notificationRouter.get('/send-reminders', notificationController.handleCronSendReminders);
notificationRouter.post('/send-reminders', notificationController.handleCronSendReminders);

// Protected routes for users
notificationRouter.post('/subscribe', authGuard, notificationController.subscribePush);
notificationRouter.post('/unsubscribe', authGuard, notificationController.unsubscribePush);
notificationRouter.post('/test', authGuard, notificationController.sendTestReminder);
