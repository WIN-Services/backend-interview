const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');

const Service = sequelize.define('Service', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName:'Services',
  timestamps: false // Disable createdAt and updatedAt fields for this model
});

module.exports = Service;