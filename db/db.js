const mongoose = require('mongoose')
mongoose.set('strictQuery', true);
const dbUrl = process.env.MONGO_URL;

function connectToDb() {
    mongoose.connect(dbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    mongoose.connection.on('connected', function () {
        console.log(" connection is open to ", dbUrl);
    });

    mongoose.connection.on('error', function (err) {
        console.log("connection has occured " + err + " error");
    });

    mongoose.connection.on('disconnected', function () {
        console.log("connection is disconnected");
    });
}

module.exports = connectToDb;