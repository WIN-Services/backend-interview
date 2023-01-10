const express = require("express");
const router = express.Router();
const ServiceController = require("../controllers/service-controller");
const serviceController = new ServiceController();

router.post("/", async (req, res) => await serviceController.create(req, res));
router.put("/:id", async (req, res) => await serviceController.update(req, res));
router.get("/:id", async (req, res) => await serviceController.getSingle(req, res));
router.get("/", async (req, res) => await serviceController.getAll(req, res));
router.delete("/:id", async (req, res) => await serviceController.delete(req, res));

module.exports = router;
