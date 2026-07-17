import cron from 'node-cron';
import { UserModel } from '../models/user.model';
import { sendReminderEmail } from './email.service';

export const checkInactiveUsersAndSendReminders = async () => {
  console.log('Starting cron job: Scanning for inactive users...');
  try {
    const daysLimit = 3;
    const inactiveLimit = new Date();
    inactiveLimit.setDate(inactiveLimit.getDate() - daysLimit);

    const batchSize = 50;
    let skip = 0;
    let hasMore = true;
    let totalSent = 0;

    while (hasMore) {
      const users = await UserModel.find({
        role: 'User',
        enableStudyReminder: true,
        lastActive: { $lt: inactiveLimit }
      })
        .skip(skip)
        .limit(batchSize);

      if (users.length === 0) {
        hasMore = false;
        break;
      }

      console.log(`Processing batch of ${users.length} inactive users...`);

      const emailPromises = users.map(async (user) => {
        try {
          await sendReminderEmail(user.email, user.displayName || user.email);
          totalSent++;
          
          // Reset lastActive to now so they are not sent emails repeatedly every day
          user.lastActive = new Date();
          await user.save();
        } catch (error) {
          console.error(`Failed to send reminder email to user ${user.email}:`, error);
        }
      });

      await Promise.all(emailPromises);
      skip += batchSize;

      // Add a small delay between batches to prevent SMTP server rate limiting
      if (users.length === batchSize) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }

    console.log(`Cron job completed. Total reminder emails sent: ${totalSent}`);
  } catch (error) {
    console.error('Error occurred during cron job execution:', error);
  }
};

export const initCronJobs = () => {
  // Schedule to run at 8:00 AM every day (0 8 * * *)
  cron.schedule('0 8 * * *', async () => {
    await checkInactiveUsersAndSendReminders();
  });
  console.log('Cron jobs scheduler initialized successfully.');
};
