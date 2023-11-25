import express from "express";
import dotenv from "dotenv";
import mongoDBConnection from "./db/mongoConnection";
import { PORT } from './config';
import serviceRoute from "./routes/serviceRoute";
import orderRoute from "./routes/orderRoute";


dotenv.config();
const app = express();

mongoDBConnection();

app.use(express.json());
app.use('/api/service', serviceRoute);
app.use('/api/order', orderRoute);

// Start the server
app.listen(PORT)
  .on('error', (error) => {
  console.error('Could not start service!', error);
}).on('close', (error: Error) => {
  console.error('The service has been stopped!', error);
}).on('listening', () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.get("/health",(req, res) => {
    res.status(200).send('Health checkup done!, Service running!');
})

module.exports = app;