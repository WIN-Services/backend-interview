module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('Order', {
        datetime: DataTypes.DATE,
        totalfee: DataTypes.DECIMAL
    }, {});
    Order.associate = function (models) {
        // associations can be defined here
        Order.belongsToMany(models.Service, { through: 'OrderServices' });
    };
    return Order;
};
