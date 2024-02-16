import { Router } from "express";
import orderRouter from "./orderRouter";

const router = Router();

router.use("/orders", orderRouter);

export default router;
