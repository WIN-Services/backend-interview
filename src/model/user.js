const mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: { type: String, unique: true },
    password: String,
    gender: String,
    dob: Date,
    role: { type: String, default: "User" },
});

module.exports = mongoose.model("users", userSchema);
