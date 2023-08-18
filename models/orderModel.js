const OrderModel = (sequelize, type) => {
    return sequelize.define('orders', {
        id: {
            type: type.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        totalAmount: type.FLOAT,
        totalServices: type.INTEGER,
        dateTime: type.DATE
    },
    {
        paranoid: true,
    })
}


module.exports = OrderModel;
