const express = require("express");
const serviceController = require('../controller/serviceController')
const app = express.Router();

app.post('/create', serviceController.createServices)
app.get('/getall', serviceController.getAllServices)
app.get('/get', serviceController.getService)
app.put('/update', serviceController.updateService)
app.delete('/delete', serviceController.deleteService)

module.exports = app;