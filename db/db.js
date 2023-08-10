// const mysql = require('mysql')
const mysql = require('mysql2')

const dbConfig = {
    host:'localhost',
    user:'USERNAME',
    password:'PASSWORD',
    database:'win-backend'
}

const connection = mysql.createPool(dbConfig)


module.exports = connection.promise()
