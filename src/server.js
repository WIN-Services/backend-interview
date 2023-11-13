const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8000;

const MONGODB_URI = process.env.MONGODB_URI;

// Database connection
const db = mongoose.connection;
db.on('error', (err) => {
    console.error(err);
});
db.once('open', () => {
  console.log('MongoDB connection ready!');
});

async function startServer() {
    await mongoose.connect(MONGODB_URI);

    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}...`);
    });    
}

startServer();