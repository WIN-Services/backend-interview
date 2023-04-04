require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/route');
const mongoString = process.env.DATABASE_URL;

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log('not working')
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})


const app = express();

app.use(express.json());
app.use('/api',routes);

app.listen(80, () => {
    console.log(`Server Started at ${80}`)
})

module.exports = app