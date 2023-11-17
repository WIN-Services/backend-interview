const express = require("express");
const router = express.Router();
const {
        getAllServices,
        getServicesById,
        createServices,
        updateServicesById,
        deleteServicesById,
} = require('../controller/services.controller')

/**
 * CRUD for services
 */

router.post("/", createServices);
router.get("/", getAllServices);
router.get("/:id", getServicesById);
router.put("/:id", updateServicesById);
router.delete("/:id", deleteServicesById);


module.exports = router;
