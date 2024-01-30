// Import necessary modules and configurations
const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');
const Service = require('./serviceModel');

// Define the Order model using Sequelize's define() method
const Order = sequelize.define(
  'Order', // Model name
  {
    // Define model attributes
    id: {
      type: DataTypes.INTEGER, // Data type for ID
      primaryKey: true, // Set ID as primary key
      autoIncrement: true // Enable auto-increment for ID
    },
    datetime: {
      type: DataTypes.DATE, // Data type for datetime
      allowNull: false // Datetime cannot be null
    },
    totalfee: {
      type: DataTypes.FLOAT, // Data type for total fee
      allowNull: false // Total fee cannot be null
    }
  },
  {
    tableName: 'orders', // Specify the actual table name in the database
    timestamps: false // Disable createdAt and updatedAt fields
  }
);

// Define associations between Order and Service models
Order.belongsToMany(Service, { through: 'OrderService' }); 

// Define a hook to set the datetime automatically before creating a new order
Order.beforeCreate((order, options) => {
  if (!order.datetime) {
    order.datetime = new Date(); // Set the datetime to the current date and time if not provided
  }
});

// Synchronize models with the database (development only)
sequelize
  .sync({ force: false }) // Sync models with the database, but don't force sync (alter table if needed)
  .then(() => {
    console.log('Database synchronized'); // Log success message if synchronization is successful
  })
  .catch((err) => {
    console.error('Error synchronizing database:', err); // Log error message if synchronization fails
  });

// Export the Order model for use in other parts of the application
module.exports = Order;
