const mongoose = require('mongoose');

const createMongoConnection = () =>{
    mongoose.connect(process.env.MONGODB_URI)
}

const getMongoConnection = () =>{
    return mongoose.connection;
}

const onError = () =>{
    console.log("Database Error");
}
const onSuccess = () => {
    console.log("connected with database");
}
module.exports = {
    createMongoConnection,
    getMongoConnection,
    onError,
    onSuccess
}