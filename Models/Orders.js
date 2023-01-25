const {DataTypes } = require('sequelize');
const sequelize = require('../util/database');

const Oders = sequelize.define('orders', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  datetime: {
    type: DataTypes.DATE(6),
    allowNull : false
  },
  totalfee : {
    type : DataTypes.INTEGER,
    allowNull : false
  },
  services : { 
    type : DataTypes.INTEGER,
    allowNull : false
  }
});

module.exports = Oders;
