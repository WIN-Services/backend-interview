const connectDB = require("./connectDB");
const Order = require("../models/order");
const Service = require("../models/service");

module.exports = {
    connectDB,
    Order,
    Service,
};
