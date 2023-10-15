const express = require("express");
const route = express.Router();
const verifyRoles = require('../middleware/verifyRole');
const user_controller = require('./../controller/user.js');

route
    .post("/login", user_controller.user_login)
    .post("/register", user_controller.register_user)
    .get("/", verifyRoles("Admin"), user_controller.get_users)
    .get("/:id", verifyRoles("Admin"), user_controller.get_user_by_id)
    .put("/:id", user_controller.update_user_by_id)
    .delete("/:id", verifyRoles("Admin"), user_controller.delete_user_by_id)

module.exports = route