import { Express } from "express";
import { serviceController } from "../controllers/service.controllers";
import validate from "../requests/user.request";
const service = new serviceController();

export function ServiceRoutes(app: Express) {
  app.post("/addService", validate("service"), service.addService);
  app.get("/getService/:serviceId", service.getService);
  app.delete("/deleteService/:serviceId", service.deleteService);
  app.put("/updateService/:serviceId",validate("service"), service.updateService);
  app.get("/serviceList", service.allServiceList);
 
}

