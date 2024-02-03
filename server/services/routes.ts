import express from "express";
import ServicesController from "./controller";
export default express
  .Router()
  .post("/createService", ServicesController.createService)
  .get("/getAvailableServices", ServicesController.fetchAvailableServices);
