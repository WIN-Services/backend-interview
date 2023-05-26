const dotenv = require('dotenv');
const express = require("express");
const bodyParser = require("body-parser");
const dbconnect = require("./dbConnection");
const serviceRoutes = require("./routes/serviceRouter");
const orderRoutes = require("./routes/orderRouter");
const cors = require('cors')

dotenv.config({})

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors({
  origin: '*'
}));




app.use("/v1/api", orderRoutes);
app.use("/v1/api", serviceRoutes);
app.use("**", (req, res) => {
    res.status(404).json({
        message: "Route Not Found"
    })
})



app.listen(process.env.PORT, async () => {
    try {
        // Database connection
        await dbconnect()
        console.log("Connected to DB and Server started at localhost:" + process.env.PORT );
    } catch(err) {
        console.log('An error occured while connection to DB',err)
        process.exit(0)
    }
});
