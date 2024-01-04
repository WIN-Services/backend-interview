module.exports = (sequelize, DataTypes) => {
    const Service = sequelize.define('Service', {
        name: DataTypes.STRING
    }, {});
    Service.associate = function (models) {
        // associations can be defined here
        Service.belongsToMany(models.Order, { through: 'OrderServices' });
    };
    return Service;
};
