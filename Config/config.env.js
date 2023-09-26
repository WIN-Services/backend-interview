const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, `../.env.${process.env.NODE_ENV}`) });

module.exports = {
    env: process.env.NODE_ENV,
    db: {
        connectionString: process.env.DEV_MONGODB_URL || process.env.STAGE_MONGODB_URL || process.env.PROD_MONGODB_URL || process.env.LOCAL_MONGODB_URL
    },
    option: {
        autoIndex: false, // don't build indexes
        //poolSize: 100,
        serverSelectionTimeoutMS: 30000,
        socketTimeoutMS: 45000,
        family: 4
    },
}