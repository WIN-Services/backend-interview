
module.exports = (sequelize, DataTypes) => {
	const Service = sequelize.define('Service', {
		description: DataTypes.STRING,
		name: DataTypes.STRING,
		orderId: DataTypes.INTEGER
	}, {});
	Service.associate = function (models) {
		Service.belongsTo(models.Order, {
			foreignKey: 'orderId'
		});
	};
	return Service;
};