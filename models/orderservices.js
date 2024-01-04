module.exports = (sequelize, DataTypes) => {
    const OrderServices = sequelize.define('OrderServices', {
        orderId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Order',
                key: 'id'
            }
        },
        serviceId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Service',
                key: 'id'
            }
        }
    }, {});
    return OrderServices;
};
