const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class OrderServiceMapping extends Model {
        static associate(models) {
            // define associations here
        }
    }
    OrderServiceMapping.init(
        {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
                primaryKey: true,
            },
            order_id: {
                type: DataTypes.INTEGER,
            },
            service_id: {
                type: DataTypes.INTEGER,
            },
        },
        {
            sequelize,
            timestamps: false,
            tableName: 'orderServiceMapping',
            modelName: 'OrderServiceMapping',
        }
    );
    return OrderServiceMapping;
};
