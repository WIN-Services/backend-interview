import { Router } from "express";
import { getAllService } from "../controller/index.controller";

const router = Router();

router.get("/getAllService", getAllService);

export default router;
