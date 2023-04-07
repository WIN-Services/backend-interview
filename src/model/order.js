const dbInstance = require('../config/databaseConfig')
const sequelize = require('sequelize')

const Order = dbInstance.define('order', {
    id: {
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    datetime: {
        type: sequelize.DATE,
        allowNull: false
    },
    totalfee: {
        type: sequelize.INTEGER,
        allowNull: false
    },
    services: {
        type: sequelize.ARRAY(sequelize.JSON),
        allowNull: false
    },
    createdAt: {
        type: sequelize.DATE,
        defaultValue: sequelize.NOW,
        allowNull: false
    },
    updatedAt: {
        type: sequelize.DATE,
        defaultValue: sequelize.NOW,
        allowNull: false
    },
    deletedAt: {
        type: sequelize.DATE,
        defaultValue: null,
        allowNull: true
    }
}, {
    // Auto-create timestamps
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    // Enable soft deletes
    paranoid: true
})

module.exports = Order