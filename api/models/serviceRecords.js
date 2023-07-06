'use strict'

const Sequelize = require('sequelize')
const sequelize = require('../helpers/db')

const serviceRecord = sequelize.define('service_records', {
    id: {
        autoIncrement: true,
        type: Sequelize.BIGINT,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        field: 'total_fee'
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
    tableName: 'service_records',
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

module.exports = serviceRecord