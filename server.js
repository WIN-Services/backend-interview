'use strict'
require('dotenv').config();
const express = require('express')
const cors = require('cors')
const router = require('./routes/routes');
require('./db/db')();

const app = express()

app.use(express.json());

process.on('unhandledRejection', (reason, p) => {
    console.error(reason, 'Unhandled Rejection at Promise', p);
})
    .on('uncaughtException', err => {
        console.error(err, 'Uncaught Exception thrown');
        process.exit(1);
    });

app.use(cors())
app.use('/api/v1', router)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`connection open on ${PORT}`)
})



module.exports = app
