const express = require('express'),
    router = express.Router();

const serviceController = require("../controllers/service");




router.post("/service", serviceController.create);
router.get("/service/:id", serviceController.get);
router.get("/services", serviceController.getAll);
router.delete("/service/:id", serviceController.delete);
router.patch("/service/:id", serviceController.update);

module.exports = router;