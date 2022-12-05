#!/usr/bin/env ts-node-script
import 'reflect-metadata';
import { Connection } from 'typeorm';
import { LocalizeService } from './src/instances/others/LocalizeService';
import { WinstonLogger } from './src/common/logging/WinstonLogger';
import { DatabaseConnection } from './src/database/instances/DatabaseConnection';

const runDatabaseMigrations = async () => {
  const db = new DatabaseConnection(new WinstonLogger(), new LocalizeService());
  try {
    // Create database connection
    const connection: Connection = await db.getConnection();

    await connection.runMigrations();
  } finally {
    await db.close();
  }

  return { status: 'success' };
};

// export const handler = (event, context, callback) => {
export const handler = () => {
  try {
    runDatabaseMigrations()
      // .then(r => {
      //   // callback(null, r);
      // })
      // .catch(err => {
      //   // callback(err || 'Unkown error happened.');
      // });
  } catch (err) {
    // callback(err || 'Unkown error happened.');
  }
};
