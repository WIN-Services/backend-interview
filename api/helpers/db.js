'use strict'

const Sequelize = require('sequelize').Sequelize
const dbConfig = {
    host: process.env.DB_HOST,
    name: process.env.DB_DATABASE,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: +process.env.MYSQL_DB_PORT
}

//SQLite config
/*
let sequelize = new Sequelize(

    {
        dialect: 'sqlite',
        storage: 'database_table.sqlite',
    }
)
*/

let sequelize1 = new Sequelize(
    dbConfig.name,
    dbConfig.username,
    dbConfig.password,
    {
        host: dbConfig.host,
        port: dbConfig.port,
        dialect: 'mysql',
        define: {
            charset: 'utf8mb4',
        },
    }
)


module.exports = sequelize
