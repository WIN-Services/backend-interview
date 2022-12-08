const mongoose = require("mongoose");

const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true});
        console.log(`database connected...`);
    }catch(error){
        console.log(error)
    }
};

module.exports = connectDB;