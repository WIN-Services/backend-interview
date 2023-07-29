const Sequelize = require('sequelize');

const dbConfig = {
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'password'
};

const sequelize = new Sequelize('winServices', dbConfig.username, dbConfig.password, {
  dialect: 'mysql',
  host: 'localhost',
  pool: {
    idle: 1000
  }
});

module.exports = sequelize;
