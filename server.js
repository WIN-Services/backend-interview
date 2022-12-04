'use strict'

const express = require('express')
const app = express()
const cors = require('cors')
const router = require('./routes/routes')
const { createDBConn } = require('./connection/db')


createDBConn();

process
  .on('unhandledRejection', (reason, p) => {
    console.error(reason, 'Unhandled Rejection at Promise', p);
  })
  .on('uncaughtException', err => {
    console.error(err, 'Uncaught Exception thrown');
    process.exit(1);
  });

const {server} = require('./config')
app.use(cors())
app.use('/',router)


app.listen(server.port, ()=>{
    console.log(`connection open on ${server.port}`)
})



module.exports = app
