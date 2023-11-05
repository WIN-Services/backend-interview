const mongoose = require("mongoose");
const OrderModel = require("../../core/schemas/orderSchema");
const ServiceModal = require("../../core/schemas/serviceSchema");
const service_test_data = require("./service.json");
const orders_test_data = require("./order.json");

// Function to connect to the test database

async function connect_db() {
    const MONGODB_TEST_URI = "mongodb://localhost:27017/orders_test"; // Test database connection string
    await mongoose.connect(MONGODB_TEST_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
}

async function close_db() {
    await mongoose.connection.close();
}

async function clear_data() {
    const collections = mongoose.connection.collections;
    for (let key in collections) {
        await collections[key].deleteMany();
    }
}

async function load_data() {
    // Craeting dummy data according to requirments
    const services = await ServiceModal.insertMany(service_test_data);
    for (let order of orders_test_data) {
        order.services.push(services[0]._id);
        order.services.push(services[1]._id);
    }
    orders_test_data[1].datetime = new Date(new Date().getTime() - (2 * 60 * 60 * 1000));

    await OrderModel.insertMany(orders_test_data);
}

module.exports = {
    connect_db,
    close_db,
    clear_data,
    load_data,
};
