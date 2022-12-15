import express, { Express, Request, Response } from 'express';
import mongoose from 'mongoose';
import bodyParser = require('body-parser');
const app: Express = express();
const port = process.env.PORT || 3000;

const connectDb = async (): Promise<any> => {
  await mongoose.connect('mongodb://127.0.0.1:27017/win', <any>{ autoIndex: true, useUnifiedTopology: true })
}
connectDb().catch(error => {
  console.error(error)
})
app.use(bodyParser.json({ type: '*/json' }));
import { ordersRouter } from './routes/';

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});


app.use('/api/v1/orders', ordersRouter);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
