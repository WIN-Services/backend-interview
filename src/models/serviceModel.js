// Import necessary modules and configurations
const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');

// Define the Service model using Sequelize's define() method
const Service = sequelize.define('Service', {
  id: {
    type: DataTypes.INTEGER, // Data type for ID
    primaryKey: true, // Set ID as primary key
    autoIncrement: true // Enable auto-increment for ID
  },
  name: {
    type: DataTypes.STRING, // Data type for service name
    allowNull: false // Service name cannot be null
  }
}, {
  tableName: 'Services', // Specify the actual table name in the database
  timestamps: false // Disable createdAt and updatedAt fields for this model
});

// Export the Service model for use in other parts of the application
module.exports = Service;
