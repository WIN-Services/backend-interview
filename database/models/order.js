
module.exports = (sequelize, DataTypes) => {
	const Order = sequelize.define('Order', {
		description: DataTypes.STRING,
		status: DataTypes.STRING,
		totalFee: DataTypes.INTEGER
	}, {});
	Order.associate = function (models) {
		// associations can be defined here
		Order.hasMany(models.Service, {
			foreignKey: 'orderId',
			onDelete: 'CASCADE'
		});
	};
	return Order;
};