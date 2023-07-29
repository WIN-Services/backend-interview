'use strict'
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Services extends Model {
        static associate(models) {
            // Specify associate with other tables
        }   
    }
    Services.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        sequelize, 
        tableName: 'services',
        modelName: 'Services'
    })
    return Services;
}