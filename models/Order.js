'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Order extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            models.Order.belongsTo(models.Services, {foreignKey: 'service_id'});
        }
    }
    Order.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        total_fee: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        service_id: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'Services',
                    key: 'id'
                }
            },
        }, {
        sequelize, 
        tableName: 'customer_orders',
        modelName: 'Order'
    });
    return Order;
}