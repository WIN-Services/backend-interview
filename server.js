const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Order = require('./models/order');

const app = express();
const PORT = 3000;

mongoose.connect('mongodb+srv://arorasparsh36:Sparsh%40123@cluster0.azj6fvu.mongodb.net/WinOrders');

console.log("sparsh codes");

app.use(bodyParser.json());

const orderRoutes = require('./routes/orderRoutes');
app.use('/api', orderRoutes);



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
