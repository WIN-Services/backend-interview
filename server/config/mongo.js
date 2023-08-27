const mongoose = require('mongoose');

mongoose.set('strictQuery', true);

const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI, {
  autoIndex: true,
  socketTimeoutMS: 60000,
  retryWrites: true,
  useUnifiedTopology: true,
  useNewUrlParser: true
});

const Mongo = {
  db: mongoose,
  Schema: mongoose.Schema,
};


mongoose.connection.on('error', (err) => {
  console.log('MongoDB error');
});
mongoose.connection.once('open', function () {
  console.log('MongoDB open');
});

module.exports = Mongo;
