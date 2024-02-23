const express = require("express");
const routes = require('./routes');
const dotenv = require('dotenv');
const dbConnection  = require('./config/databaseConnection');

const app = express();

dotenv.config();
app.use(express.json());

//connect to the database
dbConnection();

app.use('/', routes);

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

module.exports = {app, server};