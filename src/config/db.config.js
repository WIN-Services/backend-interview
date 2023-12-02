const mongoose = require('mongoose');
require('dotenv').config()

module.exports = async () => {
    try {
        await mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
        console.log("mongodb database connected successfully");

    } catch (error) {
        console.log("database not connected", error);
    }
}