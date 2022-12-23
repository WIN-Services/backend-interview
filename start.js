const app = require('./app')
const mongoose = require('mongoose');

/*database connect*/
mongoose.connect('mongodb+srv://rudransh20:abc1234@cluster0.tkld3cj.mongodb.net/?retryWrites=true&w=majority', {
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