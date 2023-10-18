const express=require('express');
const app=express();
const cors=require('cors');
const dotenv=require("dotenv");
dotenv.config();
app.use(cors())
app.use(express.json());

// Routers
const router=require('./src/routes/index');
app.use(router);


const port=process.env.PORT;

     
    app.listen(port,(req,res)=>{
        console.log(`Server is running on port ${port}`);
    })
    



