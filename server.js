import express from 'express';
import { OrderRoute, IndexRoute } from './src/router/index.js';
import morgan from 'morgan';
import mysql from './src/connection/mysql.connection.js'; //Initilazes mysql connection pool

const app = express();

app
  .use(morgan('Endpoint: :method :url; HTTP status code: :status; Response time: :response-time ms\n'))

  .use(express.json())

  .use(express.urlencoded({extended: false}))

  .use('/', IndexRoute)

  .use('/api/orders', OrderRoute)

export default app;
