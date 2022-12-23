const app = require('./app')
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://kenwaysharma:hellobro12@cluster0.xcjw1rg.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(()=>{
    return console.log('MongoDB Connected...');
  })
  .catch(err=>console.log(err));
const server = app.listen(2000, () => {
    console.log(`Express is running on port ${server.address().port}`);
  });