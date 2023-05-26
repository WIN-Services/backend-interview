const mongoose = require('mongoose');

const connectToDB = async () => {
    let connection = await mongoose.connect(process.env.CONNECTION_STRING, {
      })
    return connection;
}


module.exports =  connectToDB;