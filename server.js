require('dotenv').config();
const express = require('express');
const process = require('process');
const helmet = require("helmet");
const bodyParser = require("body-parser");
const orderRouter = require('./routes/orders');
const middlewares = require('./middlewares');

const app = express();

app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: "2mb" }));

app.use("/orders", orderRouter);

app.use(middlewares.errorLogger);
app.use(middlewares.errorResponder);
app.use(middlewares.failSafeHandler);

const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Api listening on port ${port}`)
})

process.on('uncaughtException', (error) => {
  console.error(error.message);
});

module.exports = app;