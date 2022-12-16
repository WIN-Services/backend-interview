const express = require("express");
const app = express();
const { config } = require("dotenv");
const route = require("./src/routes/route");
const connectDB = require("./db");

config();
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(process.env.PORT, () => {
  console.log(`Server connected at port ${process.env.PORT || 8000}`);
});

module.exports = route;
