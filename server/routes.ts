import { Application } from "express";
import ServiceRoutes from "./services/routes";
import OrderRoutes from "./orders/routes";
export default function routes(app: Application): void {
  app.use("/api/v1", ServiceRoutes);
  app.use("/api/v1", OrderRoutes);
}
