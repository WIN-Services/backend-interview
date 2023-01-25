const express = require('express');
const sequelize = require('./util/database');
const server = express();
require('dotenv').config();
const port = process.env.PORT
const hostname = process.env.HOSTNAME
server.use(express.json())


// Importing Routes 
const OrderRoutes = require('./Route/Order')

server.use(OrderRoutes)


sequelize
// .sync({force : true})
.sync()
.then(result => {
    // console.log(result) 
    server.listen(port, hostname, () => {
        console.log(`Server running at http://${hostname}:${port}/`);
      });
})
.catch(err => {
    console.log(err)
})
  