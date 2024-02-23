const mongoose = require('mongoose');

const connectDB = async () => {
    try{        
        await mongoose.connect(process.env.MONGODB_URI);
        console.log(`Database is connected successfully on ${process.env.MONGODB_URI}`);
    }
    catch(error){
        console.error('Error connecting to the database:', error);
        process.exit(1); //Exit the process if DB is failed to connect
    }
}

module.exports = connectDB;