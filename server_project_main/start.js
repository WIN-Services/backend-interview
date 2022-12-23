const app = require('./app')
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://suraj:surajrastogi@cluster0.e5nn3y9.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(()=>{
    return console.log('MongoDB Connected...');
  })
  .catch(err=>console.log(err));
const server = app.listen(5000, () => {
    console.log(`Express is running on port ${server.address().port}`);
  });