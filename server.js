const express = require('express');
const app = express();

// Import routes
const ordersRouter = require('./routes/orders');
const servicesRouter = require('./routes/services')

// Middleware
app.use(express.json());

// Routes
app.use('/orders', ordersRouter);
app.use('/services', servicesRouter)

// Start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});