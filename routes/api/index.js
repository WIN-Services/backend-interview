import { Router } from "express";
import orderRoutes from "./orderRoutes.js";
import serviceRoutes from "./serviceRoutes.js";

const router = Router();

// load all routes regarding options
router.use("/orders", orderRoutes);
router.use("/services", serviceRoutes);

export default router;
