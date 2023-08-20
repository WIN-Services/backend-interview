const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const dotenv = require('dotenv');

const basename = path.basename(__filename);
dotenv.config();

const env = process.env.NODE_ENV || 'development';

const db = {};

const sequelize = new Sequelize(
    process.env.DB_DATABASE,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,

    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        logging: false,

        // logging: true,
        pool: {
            max: 10,
            min: 0,
            acquire: 30000,
            idle: 10000,
        },
        dialectOptions: {},
        timezone: '+05:30',
    }
);

sequelize
    .authenticate()
    .then(() => {
        console.log('DB conncted successfully.');
        sequelize.sync();
})
    .catch((error) =>
        console.error('Unable to connect to the database:', error)
    );
fs.readdirSync(__dirname)
    .filter((file) => {
        return (
            file.indexOf('.') !== 0 &&
            file !== basename &&
            file.slice(-3) === '.js'
        );
    })
    .forEach((file) => {
        const model = require(path.join(__dirname, file))(
            sequelize,
            Sequelize.DataTypes
        );
        db[model.name] = model;
    });

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;

module.exports = db;
