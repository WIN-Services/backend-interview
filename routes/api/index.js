import { Router } from "express";
import orderRoutes from "./orderRoutes.js";

const router = Router();

// load all routes regarding options
router.use("/orders", orderRoutes);

export default router;
