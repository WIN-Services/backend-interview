module.exports = (sequelize) => {
    const {
        order,
        service
    } = sequelize.models;


    //Policy Table
    order.belongsTo(service, {
        foreignKey: {
            name: 'serviceID',
            allowNull: false,
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    });


};
