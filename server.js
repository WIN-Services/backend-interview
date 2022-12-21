const express = require("express")
const mongoose = require("mongoose")
const http = require("http")
const api = require('./routes/routes')
const { MONGO_IP } = require('./util/constants')

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_IP, { connectTimeoutMS: 5000}, function( error ){
    console.log("Mongoose connected at:", MONGO_IP, "Errors: ", error)
})

const app = express();
const port = process.env.PORT || 3000;

const server = http.createServer( app );

app.use(express.json())
app.use('/', api)

server.listen(port, () => {
    console.log("Server is running at port:", port)
})

module.exports = { app }
