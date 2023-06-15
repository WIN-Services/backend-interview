const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(process.env.postgresUri, {
  logging: false,
});


const ServiceRecord = sequelize.define('ServiceRecord', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  datetime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  totalfee: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});


Order.belongsToMany(ServiceRecord, { through: 'OrderServices' });
ServiceRecord.belongsToMany(Order, { through: 'OrderServices' });


const sequelizeError = Object.freeze({
  "FOREIGNKEY_CONSTRAINT_ERROR" : "SequelizeForeignKeyConstraintError"
});

module.exports = {Order,ServiceRecord,sequelize,sequelizeError}