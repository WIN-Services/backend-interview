'use strict'

const Sequelize = require('sequelize')
const sequelize = require('../helpers/db')

const winOrders = sequelize.define('win_orders', {
    id: {
        autoIncrement: true,
        type: Sequelize.BIGINT,
        primaryKey: true
    },
    totalFee: {
        type: Sequelize.STRING,
        field: 'total_fee'
    },
    services: {
        type: Sequelize.JSON,
        field: 'services'
    },
    createdAt: {
        type: Sequelize.BIGINT,
        field: 'created_at'
    },
    updatedAt: {
        type: Sequelize.BIGINT,
        field: 'updated_at'
    },
}, {
    timestamps: false,
    tableName: 'Orders',
    hooks: {
        beforeCreate: (model) => {
            model.set('createdAt', new Date().getTime())
            model.set('updatedAt', new Date().getTime())
        },
        beforeUpdate: (model) => {
            model.set('updatedAt', new Date().getTime())
        }
    }
})

//Used for SQLite DB
/*
sequelize.sync({ force: true }).then(async () => {

    await winOrders.bulkCreate([
        {
            totalFee: 200,
            services: [{ id: 4 }]
        }
    ])
})
*/

module.exports = winOrders