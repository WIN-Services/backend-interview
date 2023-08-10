const express = require('express');
const mongoose = require('mongoose');

require("dotenv").config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    console.log('DB is connected !!');
    app.listen(3000, () => {
        console.log('Node App is LIVE !!');
    })
})
.catch(err => {
    console.log(err);
});

module.exports = app;