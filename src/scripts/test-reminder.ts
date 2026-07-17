import { connectDb } from '../config/db';
import { UserModel } from '../models/user.model';
import { checkInactiveUsersAndSendReminders } from '../services/cron.service';

const testReminder = async () => {
  try {
    await connectDb();
    console.log('Connected to DB');

    const testEmail = 'pzonTr@gmail.com';
    let user = await UserModel.findOne({ email: testEmail });
    const isNewUser = !user;

    if (!user) {
      user = new UserModel({
        email: testEmail,
        password: 'password123',
        displayName: 'Test User Inactive',
        role: 'User'
      });
    }

    // Save original state to restore later
    const originalLastActive = user.lastActive;
    const originalEnableStudyReminder = user.enableStudyReminder;
    const originalRole = user.role;

    const fourDaysAgo = new Date();
    fourDaysAgo.setDate(fourDaysAgo.getDate() - 4);

    user.lastActive = fourDaysAgo;
    user.enableStudyReminder = true;
    user.role = 'User'; // Ensure it's User role so cron job processes it
    await user.save();

    console.log(`Prepared test user ${testEmail} with lastActive: ${user.lastActive} and enableStudyReminder: ${user.enableStudyReminder}`);

    // Run the reminder logic
    await checkInactiveUsersAndSendReminders();

    // Verify lastActive was updated
    const updatedUser = await UserModel.findOne({ email: testEmail });
    console.log(`After reminder, user lastActive updated to: ${updatedUser?.lastActive}`);

    // Restore or clean up
    if (isNewUser) {
      await UserModel.deleteOne({ email: testEmail });
      console.log('Cleaned up test user');
    } else {
      user.lastActive = originalLastActive;
      user.enableStudyReminder = originalEnableStudyReminder;
      user.role = originalRole;
      await user.save();
      console.log('Restored original user data safely');
    }

    process.exit(0);
  } catch (error) {
    console.error('Test error:', error);
    process.exit(1);
  }
};

testReminder();
