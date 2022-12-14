const express = require('express')

const app = express()

const mongoose = require('mongoose')

const orders = require('./routes/orders')
const services = require('./routes/servicerecord')


const MONG_URI = "mongodb+srv://dbUser:karthiksai@orders.szgpwcy.mongodb.net/?retryWrites=true&w=majority"

//routes
app.use(express.json())
app.use('/api/orders', orders)
app.use('/api/services', services)


//connection to DB
mongoose.set('strictQuery', true);
mongoose.connect(MONG_URI)
    .then(() => {
        app.listen(5000, ()=> {
        console.log('DB is connected and app is listening on port 5000')
        })
    }).catch((error) => {
        console.log(error)
    })