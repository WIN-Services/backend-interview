require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const verifyJWT = require("./middleware/verifyJWT");
const cors = require("cors");
const user_routes = require("./routes/user.js");
const order_routes = require("./routes/order.js");

const mongoose = require("mongoose");

mongoose
    .connect(process.env.mongodb_url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("connection is successfull");
    })
    .catch((e) => {
        console.log("database connection failed", e);
    });

const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: "10mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
app.use(verifyJWT);

app.use("/user", user_routes);
app.use("/order", order_routes);

app.listen(process.env.port, () => {
    console.log(`Server running on ${process.env.port}`);
});

module.exports = app;
