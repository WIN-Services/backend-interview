import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import { ApiRouter } from './ApiRouter';
import { connectDB } from './config/database';

const app = express();
const port = process.env.PORT || 4000;

const corsOption = {
  credentials: true,
  exposedHeaders: ['x-auth-token'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  origin: true,
};

app.use(cors(corsOption));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use((err, req, res, next) => {
  res.status(err.httpCode || 500).send({
    error: {
      status: err.httpCode || 500,
      message: err.message || 'Internal Server Error',
    },
  });
});

// connect to MongoDB database
connectDB();

// register API routes
ApiRouter.Register(app);

app.listen(port);
console.log(`Server running at http://localhost:${port}/`);

export default app;
