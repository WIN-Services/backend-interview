import express from 'express';
import { registerRoutes } from './modules/routes/routes.register';
import { connectToPostgres } from './common/connections/connect.postgres';

export const startServer = async () => {
  try {
    const app = express();

    await connectToPostgres();
    registerRoutes(app);

    const { PORT } = process.env;
    app.listen(PORT, () => console.log(`SERVER STARTED ON PORT: ${PORT}`));
  } catch (e) {
    console.error(e);
    console.error('COULD NOT START SERVER');
    process.exit(1);
  }
};
