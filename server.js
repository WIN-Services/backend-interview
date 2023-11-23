const express = require("express");
const dotenv = require("dotenv");
const mongoDBConnection = require("./database/connection");
const serviceRouter = require("./router/serviceRouter");
const orderRouter = require("./router/orderRouter");

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

mongoDBConnection();
app.use(express.json());
app.use('/api', serviceRouter);
app.use('/api', orderRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;
