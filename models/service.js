const { Sequelize, Model } = require('sequelize');

const Service = (sequelize) => {
    /* Extending the Service model from the sequilize Model class */
    class ServiceModel extends Model {

    }

    /* initiating the Service model schema */

    const DT = Sequelize.DataTypes;

    ServiceModel.init(
        {
            serviceID: {
                type: DT.INTEGER,
                field: 'service_id',
                primaryKey: true,
                autoIncrement : true
            },
            name: {
                type: DT.STRING,
                allowNull: false
            }
        },
        {
            sequelize, modelName: 'service'
        }
    );
};

module.exports = Service;
