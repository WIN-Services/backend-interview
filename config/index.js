'use strict'

require(`dotenv`).config()

module.exports = {
    server : {
        port: process.env.PORT
    },
    mongodb:{
        user:process.env.DB_USER,
        pass: process.env.DB_PASS,
        url: process.env.DB_URL
    }
}