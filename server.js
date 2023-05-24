const express = require("express");
const bodyParser = require("body-parser")
const app = express();
require("./utils/db");
require('dotenv').config()
let routes = require("./routes/order");

app.use(bodyParser.json());

app.use(routes);

app.listen(process.env.PORT,async ()=>{
    console.log(`Listening on port ${process.env.PORT}`);
})

module.exports = app;