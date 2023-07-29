const express = require('express');
const bodyParser = require('body-parser');
const db = require('./app/db');
const { errorHandler } = require('./app/middlewares')

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// connect routes
require('./app/api/order/order.route')(app);
require('./app/api/service/service.route')(app);

// Handle errors
app.use(errorHandler);

db.sync();

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});