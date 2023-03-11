const Sequelize = require("sequelize");

const sequelize = require("./../util/database");

const Order = sequelize.define("order", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  total: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  datetime: {
    type: Sequelize.DATE,
    allowNull : false
  },
  services: {
    type: Sequelize.INTEGER,
    allowNull: false,
  }
});

module.exports =  Order;