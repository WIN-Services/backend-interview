const OrderServicesJunctionModel = (sequelize, type, Order, Service) => {
    return sequelize.define('orderServices', {
        id: {
            type: type.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        orderId: {
            type: type.INTEGER,
            references: {
                model: Order,
                key: "id"
            }
        },
        serviceId: {
            type: type.INTEGER,
            references: {
                model: Service,
                key: 'id'
            }
        }
    }, {
        paranoid: true,
    })
}

module.exports = OrderServicesJunctionModel;
