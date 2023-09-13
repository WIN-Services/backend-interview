import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
dotenv.config();
import { config } from './config';
import orders from './controllers/order/orders';
import services from './controllers/service/services';
import { migrate } from './scripts/db-migration';
import { undoMigrate } from './scripts/db-undo-migration';
const app = express();
const port = config.port;

app.use(bodyParser.json());

app.get('/migrate', async (req, res) => {
  await undoMigrate();
  await migrate();

  return res.status(200).send('Migrations Completed');
});

app.use('/order', orders);
app.use('/service', services);

export default app;
