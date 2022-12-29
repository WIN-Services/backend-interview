require("dotenv").config();

const route = require('./routes/index');
const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = (process.env.APP_PORT !== undefined) ? process.env.APP_PORT : 3000;
const MONGO_URL = (process.env.MONGO_URL !== undefined) ? process.env.MONGO_URL : "mongodb://mukul:suGdFMIE7ls74TiB@ac-huaewrk-shard-00-00.2ovxeqb.mongodb.net:27017,ac-huaewrk-shard-00-01.2ovxeqb.mongodb.net:27017,ac-huaewrk-shard-00-02.2ovxeqb.mongodb.net:27017/?ssl=true&replicaSet=atlas-ewzs00-shard-0&authSource=admin&retryWrites=true&w=majority";

try {
    mongoose.set('strictQuery', false);
    mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Database connected");
      })
    .catch((err) => console.log(`Database connection error: ${err.message}`));

} catch (error) {
    handleError(error);
}

const server = app.listen(PORT, () => {
    console.log(`Server connect on port number ${PORT}`);
})

route(app);

module.exports = server