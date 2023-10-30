import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import orderRoute from './controller/order.js';
import serviceRecordRoute from './controller/service.js';
import MongoDBConnection from './database/connection.js';

export const app = express();
const port = process.env.PORT || 3002;
const corsOptions = {
    origin: '*'
};

app.use(cors(corsOptions));
app.use(express.json());

app.use('/api/order', orderRoute);
app.use('/api/service-record', serviceRecordRoute);

app.get('/', (_req, res) => res.send('Ready to serve!'));

const connectDatabase = () => {
    const database = new MongoDBConnection();
    database.getConnection();
};

app.listen(port, () => {
    connectDatabase();
    console.log(`Server running on ${port}`);
});