const express = require("express");
const { createService } = require("../controller/serviceController");
const validateCreateService = require("../middlewares/validateService");

const router = express.Router();

router.post("/createService", validateCreateService, async function (req, res) {
    await createService(req, res);
});

module.exports = router;