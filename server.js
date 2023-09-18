require('dotenv').config();
const express = require('express');

const appRoutes = require('./app/routes');
const { connectDb } = require('./app/config/db');
const { errorHandler } = require('./app/handlers/errorHandler');

const app = express();

// Establish connection to mongodb
connectDb();

// Parse body to json
app.use(express.json());

// All routes
app.use('/api/v1', appRoutes);

// Handle error thrown by any of route
app.use(errorHandler);

const port = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'test') {
  // Start the server
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
} else {
  // export app for test cases
  module.exports = app;
}
