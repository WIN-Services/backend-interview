const express = require('express');
const cors = require('cors');
require('dotenv').config();
require('./server/config/db.config');

const port = process.env.PORT || 3000;
const indexRouter = require('./server/routes/index');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', indexRouter);
app.get('/hello', (req, res) => {
  res.json('Hello from server!');
});
app.get('*', (req, res) => {
    res.json('Hello from server!');
  });
const server = app.listen(port, async (error) => {
  if (error) console.log('Error while server setup');
  else console.log('Server started on port ', port);
});

module.exports = server;