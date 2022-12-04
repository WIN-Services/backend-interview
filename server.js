const express = require("express"),
    app = express(),
    mongoose = require("mongoose");

const APP_CONSTANTS = require("./constants/application");
const DB_CONSTANTS = require("./constants/database");

// routes
let orderRoutes = require("./routes/order");
let serviceRoutes = require("./routes/service");

// assign mongoose promise library and connect to database
mongoose.Promise = global.Promise;
mongoose.connect(DB_CONSTANTS.DATABASE_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Database connected")
}).catch(err => console.log(`Database connection error: ${err.message}`));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// root route
app.use("/api/order/", orderRoutes);
app.use("/api/service/", serviceRoutes);

const server = app.listen(APP_CONSTANTS.SERVER_PORT, function () {
    console.log("Server Started");
});

module.exports = server;