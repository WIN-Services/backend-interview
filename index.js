const express = require('express');
const app = express();
const port = 8000;
const db = require('./config/mongoose');

app.use(express.urlencoded({extended : true}));

app.use('/',require('./router'));

app.listen(port , (err)=>{
    if(err){
        console.log('Error occur while runnig on server ',err);
    }

    console.log('OrderManagement is successfully running on port ',port);
});