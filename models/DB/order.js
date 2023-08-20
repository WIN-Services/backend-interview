const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Orders extends Model {
        static associate(models) {
            this.hasMany(models.OrderServiceMapping, {
                as: 'service',
                foreignKey: 'order_id',
                sourceKey:'id'
            });
        }
    }
    Orders.init(
        {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
                primaryKey: true,
            },
            datetime: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            totalfee: {
                type: DataTypes.INTEGER,
            },
        },
        {
            sequelize,
            timestamps: false,
            tableName: 'orders',
            modelName: 'Orders',
        }
    );
    return Orders;
};
