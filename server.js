const express = require("express");
const app = express();
const port = 3000;
const logger = require("morgan");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
var jsonParser = bodyParser.json({
  limit: '10mb'
});
app.use(logger("dev"));
app.use(jsonParser);

const services = require("./routes/services");
const orders = require("./routes/orders")
app.use("/services", services);
app.use("/orders", orders);

app.listen(port, () => {
  console.log(`server running on port ${port}!`);
});