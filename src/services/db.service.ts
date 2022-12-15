import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
import { ServiceRecord } from "../models/service-record.model";
import { Order } from "../models/order.model";
import { OrderServiceRecord } from "../models/order-service-record.model";

dotenv.config({path: ".env"});

class DBService {
  private _sequelize: Sequelize;

  private constructor() {
    this._sequelize = new Sequelize({
      dialect : "mysql",
      host    : process.env.MYSQL_HOSTNAME,
      database: process.env.MYSQL_DB, 
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      logging: false,
    });

    this._sequelize.addModels([
      ServiceRecord,
      Order,
      OrderServiceRecord
    ])
  }

  static getInstance(): DBService {
    return new DBService();
  }

  getSequelize(): Sequelize {
    return this._sequelize;
  }
}

export const dbService = DBService.getInstance();