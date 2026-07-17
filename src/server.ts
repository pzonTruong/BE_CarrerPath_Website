import { app } from './app';
import { connectDb } from './config/db';
import { env } from './config/env';
import { initCronJobs } from './services/cron.service';

const start = async () => {
  await connectDb();
  initCronJobs();
  app.listen(env.port, () => {
    console.log(`Backend running at http://localhost:${env.port}`);
  });
};

start().catch((error) => {
  console.error(error);
  process.exit(1);
});
