const express = require('express')
const dbInstance  = require('./src/config/databaseConfig')
const bodypParser = require('body-parser')
const { getAllOrders, getOrderById, createOrder, updateOrder, deleteOrder } = require('./src/controller/orderController')

let app = express()  // initialize the express object.

let port = 4000

//start the server at specific port.
app.listen(port, function(){
    console.log(`server is started on port ${port}`)
})

dbInstance.sync().then((result)=>{
    console.log('database has been connected successfully.')
}).catch((error)=>{
    console.error('error in connecting to database.', error)
})

// Common middlewares
app.use(bodypParser.json())

// Application Routes
app.get('/api/v1/orders', getAllOrders)
app.get('/api/v1/orders/:id', getOrderById)
app.post('/api/v1/orders', createOrder)
app.put('/api/v1/orders/:id', updateOrder)
app.delete('/api/v1/orders/:id', deleteOrder)