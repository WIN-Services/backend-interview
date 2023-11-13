const mongoose = require('mongoose')

const connectDB = async () =>{
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI)
        console.log(`Db connected ${connection.connection.host}`)
    } catch (error) {
        console.log("error",error);
        process.exit(1);
    }
}

module.exports = connectDB