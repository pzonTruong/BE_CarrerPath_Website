import { connectDb } from '../config/db';
import { seedAllAdminData } from '../services/seed.service';

const run = async () => {
  try {
    await connectDb();
    console.log('Connected to DB');

    const result = await seedAllAdminData();
    console.log(`Successfully seeded ${result.skillsCount} skills and ${result.careersCount} careers and roadmaps.`);

    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

run();
