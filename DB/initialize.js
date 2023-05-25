import { MongoClient } from "mongodb";
import config from "../configs/development.js";
import DBFunction from "./DBFunctions.js";

export default class DB {
  constructor() {
    this.dbClient = null;
  }

  async Initialize() {
    const client = await MongoClient.connect(config.MONGO_URL);
    console.log("Mongo Client successfully configured");
    this.dbClient = client;
  }

  async getDBConnections(databases) {
    await this.Initialize();
    const dbConn = {};
    databases.forEach((dbName) => {
      dbConn[dbName] = new DBFunction(this.dbClient, dbName);
    });
    return dbConn;
  }
}
