const { Sequelize, Model } = require('sequelize');

const Order = (sequelize) => {
    /* Extending the Order model from the sequilize Model class */
    class OrderModel extends Model {

    }

    /* initiating the Order model schema */

    const DT = Sequelize.DataTypes;

    OrderModel.init(
        {
            orderID: {
                type: DT.INTEGER,
                field: 'order_id',
                primaryKey: true,
                autoIncrement : true
            },
            datetime: {
                type: DT.DATE,
                allowNull: false,
                defaultValue: new Date()
            },
            totalfee: {
                type: DT.INTEGER,
                allowNull: false
            }
        },
        {
            sequelize, modelName: 'order'
        }
    );
};

module.exports = Order;
