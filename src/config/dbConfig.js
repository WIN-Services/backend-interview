const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('order-management', 'postgres', 'aaliya', {
  host: 'localhost',
  dialect: 'postgres',
  port: 5432, 
});

module.exports = sequelize;