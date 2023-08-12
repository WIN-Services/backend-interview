const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const orderRouter = require('./src/routes/orderRoutes');
const mongoose = require('mongoose');

const app = express();

dotenv.config();

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.use('/orders', orderRouter);

mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log('DB is connected !!');
}).catch(err => {
    console.log(err);
});

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

module.exports = app;
