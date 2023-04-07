const sequelize = require('sequelize')
require('pg').defaults.parseInt8 = true
let database = 'win_assessment_db'
let username = 'postgres'
let password = '12345'

let dbInstance = new sequelize.Sequelize(database, username, password, {
    host: 'localhost',
    dialect: 'postgres',
    port: 5432,
    logging: false
})

module.exports = dbInstance

