const config = require('./config/config');
// set port, listen for requests
const PORT = process.env.PORT || 5000;

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Db config
const db = require('./models');
db.sequelize
  .sync()
  .then(() => {
    console.log('Synced db.');
  })
  .catch((err) => {
    console.log('Failed to sync db: ' + err.message);
  });

// simple route
app.get('/', (req, res) => {
  res.json({
    message: 'Service is healthy. Current time: ' + new Date(Date.now()),
  });
});

//Configuring other routes
require('./routes/order.routes')(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
module.exports = app;