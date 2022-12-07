const express=require("express");
const bodyParser=require("body-parser");
const orderRouter=require("./routes/order.route");
const app=express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());

app.use("/",orderRouter);

app.listen(3000,()=>{
    console.log("Server is up");
})