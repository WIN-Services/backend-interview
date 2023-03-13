const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { response } = require("./config/response");

/* CONFIGURATIONS */
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());


const PORT = process.env.PORT || 5001;

app.listen(PORT, ()=> console.log("Server Running on PORT",PORT));

/* ROUTES WITH FILES */
app.use("/orders",require('./routes/orders'));

app.use('*', function (req, res) {
    return response(400,'invalid route',{},res);
})
