const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Services extends Model {
        static associate(models) {
            // define associations here
        }
    }
    Services.init(
        {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
                primaryKey: true,
            },
            name: {
                type: DataTypes.DATE,
                allowNull: false,
            },
        },
        {
            sequelize,
            timestamps: false,
            tableName: 'services',
            modelName: 'Services',
        }
    );
    return Services;
};
