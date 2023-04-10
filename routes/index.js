import { Router } from "express";
import apiRouter from "./api/index.js";

const router = Router();

/** READ */
router.use("/api", apiRouter);

export default router;
