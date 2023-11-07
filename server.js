const express = require('express');
const bodyParser = require('body-parser');
const serviceRoute = require('./route/serviceRecordRoute');
const orderRoute = require('./route/orderRoute')
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.json());

app.use('/', serviceRoute);
app.use("/order",orderRoute)

//mongoose Database connection
//use mongoose URI
mongoose.connect("Mongoose URI").then(() =>{
    console.log("database is connected")
}).catch(()=> {
    console.log("database is not connected")

});

//for 8000 server
app.listen(8000, () => {
  console.log('Server started on port 8000');
});