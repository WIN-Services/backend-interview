//console.log("Start")

const express = require('express')
const bodyParser = require('body-parser')
const orderRoutes = require('./routes/orderRoutes')

const app = express()
const port = 3020

app.use(bodyParser.json())

app.use('/orders',orderRoutes)

app.listen(port, () =>{
    console.log('Server is running on port ${port}')
})

module.exports = app