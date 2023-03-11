require('dotenv').config();
const Sequelize = require("sequelize");

const port = process.env.POSTGRES_PORT || '5432';
const host = process.env.POSTGRES_HOST || 'postgres';
const db = process.env.POSTGRES_DB || 'postgres';
const username = process.env.POSTGRES_USER || 'postgres';
const password = process.env.POSTGRES_PASSWORD || 'postgres';

const sequelize = new Sequelize(db, username, password, {
  dialect: "postgres",
  host: host,
  port: port
});

module.exports = sequelize;