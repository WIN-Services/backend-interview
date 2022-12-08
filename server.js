const express = require('express');
const app = express();
const {config}=require('dotenv')
const route = require('./src/routes/route');
const connectDB=require('./db')

config()
connectDB()
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/', route);

app.listen(process.env.PORT, function () {
    console.log(`Server Connected at port ${process.env.PORT || 3000}`)
});