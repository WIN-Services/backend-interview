const mongoose = require('mongoose');
const {DB_LOGIN, DB_PASSWORD, DB_NAME} = process.env
const db = mongoose.connect(`mongodb+srv://chsrinu:bunty90@cluster0.x0cobng.mongodb.net?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
  if (err) throw err;
  else console.log('Connected to db');
});

module.exports = db;