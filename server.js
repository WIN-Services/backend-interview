const PORT = process.env.PORT || 3333;

const express = require("express");
const app = new express();

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const orderRoute = require("./src/routes/order");
app.use("/orders", orderRoute);

const { connectDB } = require("./src/controllers/setupDB");

if (process.env.RUN_SERVER === "true") {
    app.listen(PORT, async () => {
        try {
            await connectDB();
            console.log(`Server is running on port ${PORT}`);
        } catch (error) {
            console.error("Error starting the server:", error);
        }
    });
}

process.on("uncaughtException", function (err) {
    console.error(err.stack);
});

module.exports = app;
