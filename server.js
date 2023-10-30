const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mongodb = require('./src/models')
const routes = require("./src/routes")
const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use('', routes);
// Start the server
if (process.env.RUN_SERVER == "true"){
  app.listen(port, async () => {
    try {
      await mongodb.connectDB()
      console.log(`Server is running on port ${port}`);
    } catch (error) {
      console.error('Error starting the server:', error);
    }
  });
}


process.on('uncaughtException', function (err) {
  console.error(err.stack);
});

module.exports = app