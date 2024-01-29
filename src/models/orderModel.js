const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');
const Service = require('./serviceModel');

const Order = sequelize.define(
  'Order',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    datetime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    totalfee: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  },
  {
    tableName: 'orders', // Specify the actual table name
    timestamps: false // Disable createdAt and updatedAt fields
  }
);

// Define associations if needed
Order.belongsToMany(Service, { through: 'OrderService' }); // Adjust the association as per your schema

// Define a hook to set the datetime automatically before creating a new order
Order.beforeCreate((order, options) => {
  if (!order.datetime) {
    order.datetime = new Date(); // Set the datetime to the current date and time
  }
});

// Synchronize models with the database (development only)
sequelize
  .sync({ force: false })
  .then(() => {
    console.log('Database synchronized');
  })
  .catch((err) => {
    console.error('Error synchronizing database:', err);
  });

module.exports = Order;
