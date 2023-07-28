const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const orderRoutes = require("./routes/orderRoutes");
const orderServices = require("./routes/serviceRoutes")

dotenv.config();
const app = express();

//! Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to Database"))
  .catch((err) => console.error("Error connecting to Database:", err));

app.use(express.json());

//! Routes
app.use("/", orderRoutes);

app.use("/services", orderServices);

app.get("/", (req, res) => {
  res.send("Everything looks good!");
});
//! Start the server
const port = process.env.PORT || 8798;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
