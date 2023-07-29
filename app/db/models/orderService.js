const Sequelize = require('sequelize');
const sequelize = require('../index');

const OrderService = sequelize.define(
  'orderService',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    orderId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'orders',
        key: 'id'
      },
      allowNull: false
    },
    serviceId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'services',
        key: 'id'
      },
      allowNull: false
    }
  },
  {
    tableName: 'orderService'
  }
);

module.exports = OrderService;
