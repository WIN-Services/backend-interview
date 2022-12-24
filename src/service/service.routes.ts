import {
  addServiceController,
  getServiceController,
  removeServiceController,
  updateServiceController,
} from "./service.controller";
import express from "express";
const router = express.Router();

router.post("/service", addServiceController);
router.get("/service", getServiceController);
router.delete("/service/:id", removeServiceController);
router.put("/service/:id", updateServiceController);

// addServiceController;

export default router;