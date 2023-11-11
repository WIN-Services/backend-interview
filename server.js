const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const http = require("http");

const server = http.createServer(app);

//router paths
const orderRouter = require("./src/router/order.routes");
const serviceRouter = require("./src/router/service.routes");

const  morgan = require("morgan");
const { connectDB }  = require('./src/config/dbConnection')


connectDB();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(morgan("combined"));

// Passport middleware
app.use(cors({ origin: "*" }));


//Routers
app.use("/api/v1/order", orderRouter);
app.use("/api/v1/service", serviceRouter);



app.get("/health-check", (req, res) => {
    res.send("Server is running...");
});


let PORT = 5000

server.listen(PORT, () => {
    console.log("---------------------------------");
    console.log(`🚀 App is listening on ${PORT} 🚀`);
    console.log("---------------------------------");
});

module.exports = { app, server };
