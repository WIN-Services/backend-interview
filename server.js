const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');
require('dotenv').config()

const service = require('./routes/service')
const order = require('./routes/order')

const mongodbURL = process.env.mongodbURL;
const app = express()

mongoose.connect(mongodbURL, { useNewUrlParser: true, useUnifiedTopology: true })
const con = mongoose.connection
con.on('open', () => {
    console.log('connected to db')
    app.listen(process.env.PORT || 9000, () => {
        console.log('server started')
    })
})

app.use(express.json())
app.use(cors());
app.use('/service', service)
app.use('/order', order)
