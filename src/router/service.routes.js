const express = require("express");
const router = express.Router();
const {
    getAllService,addService
} = require("../controller/service.controller");



router.get("/get-all", getAllService);
router.post("/add", addService);

module.exports = router;
