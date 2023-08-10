// const mysql = require('mysql')
const mysql = require('mysql2')

const dbConfig = {
    host:'localhost',
    user:'root',
    password:'aniroodh',
    database:'win-backend'
}

const connection = mysql.createPool(dbConfig)

// connection.connect((err) => {
//     if(err){
//         console.error('Error connecting to the DB')
//         return
//     }else{
//         console.log('DB connected')
//     }
// })

module.exports = connection.promise()