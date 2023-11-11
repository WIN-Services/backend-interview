const mongoose = require('mongoose')
//Need to add in .env
const MONGO_URI = "mongodb+srv://Bishal02:bishal2002@cluster0.hnugk9t.mongodb.net/WIN_TASK";

mongoose.set('strictQuery', false);
exports.connectDB = async () => {
    try {
        mongoose.connect(MONGO_URI, { 
            useNewUrlParser: true,});
            console.log(`🗃️  Connected with DB successfully 🗃️`); 
        } catch (err) {
            console.error(err.message); 
            process.exit(1);
        }
    };
