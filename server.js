const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = express();
const port = 3000;

// Connect to MongoDB using Mongoose
mongoose.connect(
  "mongodb+srv://12345:12345@win.4uegk3p.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

app.use(bodyParser.json());
app.use(morgan("dev"));

const orderRoutes = require("./routes/orderRoutes");

// Use the order routes
app.use("/orders", orderRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
