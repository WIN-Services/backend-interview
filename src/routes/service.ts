import { Router } from "express";
import {
  getServices,
  getServiceById,
  addService,
  deleteService,
  updateService,
} from "../controllers/service";

const serviceRoutes: Router = Router();

serviceRoutes.get("/", getServices);
serviceRoutes.get("/:serviceId", getServiceById);
serviceRoutes.post("/", addService);
serviceRoutes.delete("/:serviceId", deleteService);
serviceRoutes.patch("/:serviceId", updateService);

export default serviceRoutes;
