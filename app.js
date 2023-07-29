const express = require('express');

const orderController = require('./controller.js');

const app = express();

// Middleware to parse JSON data
app.use(express.json());

// Middleware to parse URL-encoded form data
app.use(express.urlencoded({ extended: true }));

// Endpoint for the GET API
app.get('/', orderController.getOrders);
app.post('/', orderController.addOrders);
app.put('/', orderController.updateOrders);
app.delete('/', orderController.deleteOrders);

// Start the server on port 3000
const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});