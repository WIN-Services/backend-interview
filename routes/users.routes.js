const express = require("express");
const router = express.Router();
const userController = require("../controllers/users.controller");

router.post("/register", userController.registerUser);
router.post("/login", userController.userLogin);
module.exports = {router}