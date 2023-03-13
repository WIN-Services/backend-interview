require('dotenv').config();
const sql = require("sequelize");

const port = process.env.DB_PORT || '5432';
const host = process.env.DB_HOST || 'postgres';
const db = process.env.DB_DB || 'testOrders';
const username = process.env.DB_USER || 'postgres';
const password = process.env.DB_PASSWORD || '@yushVer01';

const sequelize = new sql(db, username, password, {
  dialect: "postgres",
  host: host,
  port: port
});

module.exports = sequelize;
