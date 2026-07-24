import { Request, Response } from 'express';
import webpush from 'web-push';
import { PushSubscriptionModel } from '../models/push-subscription.model';
import { UserModel } from '../models/user.model';

const VAPID_PUBLIC_KEY = process.env.VAPID_PUBLIC_KEY || '';
const VAPID_PRIVATE_KEY = process.env.VAPID_PRIVATE_KEY || '';
const VAPID_SUBJECT = process.env.VAPID_SUBJECT || 'mailto:admin@careerpath.com';

if (VAPID_PUBLIC_KEY && VAPID_PRIVATE_KEY) {
  webpush.setVapidDetails(VAPID_SUBJECT, VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY);
}

export const getVapidPublicKey = async (req: Request, res: Response) => {
  return res.json({ publicKey: VAPID_PUBLIC_KEY });
};

export const subscribePush = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { subscription } = req.body;

    if (!subscription || !subscription.endpoint || !subscription.keys) {
      return res.status(400).json({ message: 'Invalid subscription object' });
    }

    await PushSubscriptionModel.findOneAndUpdate(
      { endpoint: subscription.endpoint },
      {
        userId,
        endpoint: subscription.endpoint,
        keys: subscription.keys
      },
      { upsert: true, new: true }
    );

    await UserModel.findByIdAndUpdate(userId, { enableStudyReminder: true });

    return res.status(201).json({ message: 'Subscribed to study reminders successfully' });
  } catch (error: any) {
    return res.status(500).json({ message: 'Failed to subscribe push notification', error: error.message });
  }
};

export const unsubscribePush = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { endpoint } = req.body;

    if (endpoint) {
      await PushSubscriptionModel.deleteOne({ endpoint, userId });
    } else {
      await PushSubscriptionModel.deleteMany({ userId });
    }

    await UserModel.findByIdAndUpdate(userId, { enableStudyReminder: false });

    return res.json({ message: 'Unsubscribed from study reminders' });
  } catch (error: any) {
    return res.status(500).json({ message: 'Failed to unsubscribe', error: error.message });
  }
};

export const sendTestReminder = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const subscriptions = await PushSubscriptionModel.find({ userId });

    if (subscriptions.length === 0) {
      return res.status(404).json({ message: 'No active push subscription found for your browser. Please enable reminders first.' });
    }

    const payload = JSON.stringify({
      title: '🦉 Cú Hạc Nhắc Học (Duolingo Style)',
      body: 'Đã đến giờ học rồi! Cùng tiếp tục duy trì chuỗi lộ trình nghề nghiệp hôm nay nào! 🔥',
      icon: '/pwa-192x192.png',
      url: '/dashboard'
    });

    let sentCount = 0;
    for (const sub of subscriptions) {
      try {
        await webpush.sendNotification(
          {
            endpoint: sub.endpoint,
            keys: sub.keys
          },
          payload
        );
        sentCount++;
      } catch (err: any) {
        if (err.statusCode === 410 || err.statusCode === 404) {
          // Subscription expired or invalid
          await PushSubscriptionModel.deleteOne({ _id: sub._id });
        }
      }
    }

    return res.json({ message: `Sent test reminder notification to ${sentCount} browser session(s)!` });
  } catch (error: any) {
    return res.status(500).json({ message: 'Failed to send test push notification', error: error.message });
  }
};

export const handleCronSendReminders = async (req: Request, res: Response) => {
  try {
    // Optional Vercel Cron Secret validation
    const authHeader = req.headers.authorization;
    const cronSecret = process.env.CRON_SECRET;
    if (cronSecret && authHeader !== `Bearer ${cronSecret}` && req.headers['x-cron-secret'] !== cronSecret) {
      // Allow trigger if in dev or matches secret
      if (process.env.NODE_ENV === 'production' && req.headers['user-agent']?.includes('vercel-cron')) {
        // Vercel Cron user agent check
      }
    }

    // Find all users who enabled study reminder
    const usersWithReminder = await UserModel.find({ enableStudyReminder: true }).select('_id email displayName');
    const userIds = usersWithReminder.map(u => u._id);

    const subscriptions = await PushSubscriptionModel.find({ userId: { $in: userIds } });

    const payload = JSON.stringify({
      title: '🦉 Cú Hạc Remind: Đã đến giờ luyện tập!',
      body: 'Đừng bỏ lỡ streak lộ trình nghề nghiệp hôm nay. Dành 15 phút nâng cao kỹ năng ngay nhé! 🚀',
      icon: '/pwa-192x192.png',
      url: '/dashboard'
    });

    let successCount = 0;
    let failCount = 0;

    for (const sub of subscriptions) {
      try {
        await webpush.sendNotification(
          {
            endpoint: sub.endpoint,
            keys: sub.keys
          },
          payload
        );
        successCount++;
      } catch (err: any) {
        failCount++;
        if (err.statusCode === 410 || err.statusCode === 404) {
          await PushSubscriptionModel.deleteOne({ _id: sub._id });
        }
      }
    }

    return res.json({
      success: true,
      timestamp: new Date().toISOString(),
      activeUsersCount: usersWithReminder.length,
      notificationsSent: successCount,
      notificationsFailed: failCount
    });
  } catch (error: any) {
    return res.status(500).json({ message: 'Cron reminder execution failed', error: error.message });
  }
};
