const ServicesModel = (sequelize, type) => {
    return sequelize.define('services', {
        id: {
            type: type.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: type.STRING,
            allowNull: false,
            validate: { len: 3 },  
        },
        serviceCode: {
            type: type.INTEGER,
            allowNull: false,
            unique: true
        },
        cost: {
            type: type.FLOAT,
            allowNull: false
        }
    })
}


module.exports = ServicesModel;
