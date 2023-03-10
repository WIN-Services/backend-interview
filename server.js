const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');
const errorController = require('./controllers/errorcontroller');

const app = express();

app.use(bodyParser.json());

app.use(routes);

app.use(errorController.handleErrors);

app.listen(3000, () => {
console.log('Server is running on port 3000');
});

module.exports = app