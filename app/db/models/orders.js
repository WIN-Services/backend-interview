const Sequelize = require('sequelize');
const sequelize = require('../index');

const Orders = sequelize.define(
  'orders',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    totalFee: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  },
  {
    tableName: 'orders'
  }
);

module.exports = Orders;
