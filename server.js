const express = require('express');
const bodyParser = require('body-parser');
const connectDatabase = require('./src/config/database');
const orderRoutes = require('./src/routes/orderRoutes');
const serviceRoutes = require('./src/routes/servicesRoutes');

const app = express();
const PORT = 7000;

app.use(bodyParser.json());

// Connect to the database
connectDatabase();

// Register routes
app.use('/orders', orderRoutes);
app.use('/services', serviceRoutes);

console.log('app.listen')
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = {
    app,
    server
};