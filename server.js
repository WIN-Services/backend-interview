console.log("Start")
const express = require("express")
const app = express()
const databaseConnection = require("./src/config/db.config")
const routes = require("./src/routes")
require('dotenv').config()
const PORT = process.env.PORT || 8000

app.use(express.json())
app.use(express.urlencoded({ extended: false, limit: '200mb' }))
let num = 0
app.use(function (req, res, next) {
    const method = req.method;
    const url = req.url;
    console.log((++num) + " " + method + " " + url);
    next();
});

databaseConnection()
routes({ app })

app.listen(PORT, () => {
    console.log("Server started on port ", PORT)
})
module.exports = app