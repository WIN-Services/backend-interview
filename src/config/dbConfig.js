// Import the Sequelize module
const { Sequelize } = require('sequelize');

// Create a new Sequelize instance with database connection parameters
const sequelize = new Sequelize('order-management', 'postgres', 'aaliya', {
  host: 'localhost', // Database host
  dialect: 'postgres', // Database dialect (in this case, PostgreSQL)
  port: 5432, // Database port
});

// Export the sequelize instance for use in other parts of the application
module.exports = sequelize;
