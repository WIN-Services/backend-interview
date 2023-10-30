const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost/ordermanagementserviceDB", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("connected to Database");
    } catch (error) {
        console.error("connection to Database failed", error);
    }
};

module.exports = connectDB;
