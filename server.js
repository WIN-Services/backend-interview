const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { response } = require("./config/response");
const { ValidationError } = require('express-json-validator-middleware');
const { verifyToken } = require("./middleware/auth");

/* CONFIGURATIONS */
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());


const PORT = process.env.PORT || 5001;

app.listen(PORT, ()=> console.log("Server Running on PORT",PORT));

app.use(verifyToken);

/* ROUTES WITH FILES */
app.use("/orders",require('./routes/orders'));

app.use('*', function (req, res) {
    return response(400,'invalid route',{},res);
})

app.use((e, req, res, next) => {
    if (e instanceof ValidationError) {
        return response(400,e.validationErrors.body[0].message,{},res);
        next();
    } else { next(e); }
});