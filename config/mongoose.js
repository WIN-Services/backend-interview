const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/winiOrderManage',{ useNewUrlParser : true});

const db = mongoose.connection;

db.on('error',console.error.bind(console,"Connection error "));
db.once('open',()=>{
    console.log("Connection successfully witn mongoose");
});

module.exports = db;