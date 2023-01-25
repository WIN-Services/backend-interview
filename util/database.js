const Sequelize = require('sequelize');

const sequelize = new Sequelize('win', 'root', 'rootpassword', {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;
