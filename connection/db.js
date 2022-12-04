const mongoose = require('mongoose')
const { mongodb } = require('../config/index')

const dbUrl = `mongodb+srv://${mongodb.user}:${mongodb.pass}@${mongodb.url}/?retryWrites=true&w=majority`

function createDBConn(){
    mongoose.connect(dbUrl,{useNewUrlParser: true});

    mongoose.connection.on('connected', function(){
        console.log("Mongoose default connection is open to ", dbUrl);
    });

    mongoose.connection.on('error', function(err){
        console.log("Mongoose default connection has occured "+err+" error");
    });

    mongoose.connection.on('disconnected', function(){
        console.log("Mongoose default connection is disconnected");
    });

    process.on('SIGINT', function(){
        mongoose.connection.close(function(){
            console.log("Mongoose default connection is disconnected due to application termination");
            process.exit(0)
        });
    });
}

module.exports = {
    createDBConn
}