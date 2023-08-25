const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
const {MongoMemoryServer} = require('mongodb-memory-server');
require('dotenv').config();

let mongo = null;

const setupDatabase = async () => {
    mongo = await MongoMemoryServer.create();
    const uri = mongo.getUri();

    await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
};

const dropDB = async () => {
    if (mongo) {
        await mongoose.connection.dropDatabase();
    }
};

const closeDB = async () => {
    if (mongo) {
        await mongoose.connection.close();
        await mongo.stop();
    }
};

module.exports = { setupDatabase, dropDB, closeDB };