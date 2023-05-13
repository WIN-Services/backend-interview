const mongoose = require('mongoose');
const dbUri = process.env.DB_CONNECTION_URL;

const dbUtil = {
    connect: async () => {
        try {
            await mongoose.connect(dbUri);
            console.log(process.env.NODE_ENV)
            console.log(`Successfully connected to DB`)
        } catch (error) {
            console.log(`Error: ${error}`)
        }
    }
}

module.exports = {dbUtil};