const express = require("express");
require('dotenv').config();

// using Express
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// testing routes -- BASE_URL
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Task-Management application." });
});

const routes = require("./app/routes");
app.use("/api", routes)

// set port, listen for requests
const PORT = process.env.PORT || 8083;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

module.exports = app;