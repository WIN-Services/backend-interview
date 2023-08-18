const UserModel = (sequelize, type) => {
    return sequelize.define('users', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        name: {
            type: type.STRING,
            allowNull: false
        },
        email: {
            type: type.STRING,
            unique: true,
            allowNull: false
        },
        password: {
            type: type.STRING, 
            allowNull: false
        }
    })
}

module.exports = UserModel;