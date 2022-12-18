import * as dotenv from "dotenv";
import { Sequelize } from 'sequelize-typescript';
import { Service, Order, ServiceOrder } from '../models';

if (process.env.NODE_ENV !== 'prod') {
  dotenv.config();
}
const dbUri = process.env.DB_URI as string;

export const sequelize = new Sequelize(dbUri, {
  dialect: 'postgres',
  models: [Service, Order, ServiceOrder],
  repositoryMode: true,
});
