const express = require("express")
const app = express()
const mongoose = require("mongoose")
const orderRoute = require("./controllers/ordersController");
require("dotenv").config()


app.use(express.json())
app.use('/order/',orderRoute);


//DB connection
mongoose.connect(process.env.MONGO_URI)

//To start listening to the server
app.listen(process.env.PORT)