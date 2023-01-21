const { Pool } = require("pg");
const dotenv = require('dotenv');

dotenv.config()


const pool = new Pool({
    "host": process.env.HOST,
    "port": process.env.DBPORT,
    "user": process.env.USERNAME,
    "password" : process.env.PASSWORD,
    "database" : process.env.DATABASE,
    "max": 20,
    "connectionTimeoutMillis" : 0,
    "idleTimeoutMillis": 0
})

module.exports = pool;