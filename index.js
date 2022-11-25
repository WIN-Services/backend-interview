//Loading Basic Modules
const mongoose = require('mongoose');
const express = require('express');
var app = express();


//Requiring dotenv
require("dotenv").config()


//Require MiddleWare
const bodyParser = require('body-parser')
const cors = require('cors')


//Making Connection String
var  connection_string = `mongodb://localhost/project`

//Making Connection
mongoose.connect(connection_string, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
            console.log("Database connected")
      })
      .catch((err) => {
            console.log(`Error connecting Database: ${err}`)
      })

 //const studentassignment = require('./routers/application/studentAnswer')
 
 const createServices = require("./routers/service")
 const createOrder = require("./routers/order")





//Using MiddleWare
app.use(bodyParser.json())
app.use(cors())

app.use("/", createServices)
app.use("/", createOrder)



//Making app live on this port 
app.listen(process.env.APPLICATION_PORT, () => {
    console.log(`prototype apis is running on ${process.env.APPLICATION_PORT}`)
})
