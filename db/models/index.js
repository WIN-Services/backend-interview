const { Sequelize, DataTypes } = require('sequelize');

const env = process.env["environment"] || "development"
const config = require("../../config/config.json");
const sequelize = new Sequelize({
    dialect: config[env].dialect,
    storage: config[env].storage
  });

const Service = sequelize.define('Service', {
  // Model attributes are defined here
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: false
  // Other model options go here
});

const Order = sequelize.define('Order', {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    datetime: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    totalfee: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
  }, {
    timestamps: false
    // Other model options go here
});

Order.belongsToMany(Service, { through: "OrderService", onDelete: 'CASCADE' });
Service.belongsToMany(Order, { through: "OrderService", onDelete: 'CASCADE' });


module.exports = {
  sequelize,
  Order,
  Service
};