const mongoose = require("mongoose");

const DB_URL = process.env.DB_URL;
mongoose.connect(DB_URL);
const db = mongoose.connection;
db.on("error", () => {
    console.log("debug", "error in database connection");
});
db.once("open", () => {
    console.log("debug", "Database Connected successfully");
});

module.exports = db;
