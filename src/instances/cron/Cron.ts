import * as cron from 'node-cron';
import { WinstonLogger } from '../../common/logging/WinstonLogger';
import { DatabaseConnection } from '../../database/instances/DatabaseConnection';
import { LocalizeService } from '../others/LocalizeService';

// Referance link: https://www.npmjs.com/package/node-cron
// https://www.geeksforgeeks.org/how-to-run-cron-jobs-in-node-js/

// Run cron at 12:00 AM daily
const cronAt12AM = cron.schedule('0 0 * * *', async () => {
  const db = new DatabaseConnection(new WinstonLogger(), new LocalizeService());
  try {
    // Create database connection
  } finally {
    await db.close();
  }
});
cronAt12AM.start();
