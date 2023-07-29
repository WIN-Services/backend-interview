const Sequelize = require('sequelize');
const sequelize = require('../index');

const Services = sequelize.define(
  'services',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING(50),
      allowNull: false
    }
  },
  {
    tableName: 'services'
  }
);

module.exports = Services;
