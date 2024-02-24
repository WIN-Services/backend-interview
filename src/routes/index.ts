import { Router } from "express";
import orderRoutes from "./order";
import serviceRoutes from "./service";

const rootRouter: Router = Router();

rootRouter.use("/order", orderRoutes);
rootRouter.use("/service", serviceRoutes);

export default rootRouter;
