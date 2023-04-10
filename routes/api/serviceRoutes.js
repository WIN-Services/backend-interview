import { Router } from "express";
import ServiceController from "../../controllers/serviceController.js";

const router = Router();

const serviceController = new ServiceController();

/** READ */
router.get("/", serviceController.fetchAllServices);

router.get("/:id", serviceController.getService);

/**CREATE */
router.post("/create", serviceController.createService);

/**DELETE */
router.delete("/delete/:id", serviceController.destroyService);

export default router;
