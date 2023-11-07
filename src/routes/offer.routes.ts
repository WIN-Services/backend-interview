import { Express } from "express";
import { offerController } from "../controllers/offer.controllers";
import validate from "../requests/user.request";
const offers = new offerController();

export function OfferRoutes(app: Express) {
  app.post("/offer", validate("offer"), offers.addOffer);
  app.get("/getOffer/:id", offers.getOffer);
  app.get("/getOfferList", offers.getOfferList);
  app.put("/updateOffer/:id", offers.editOffer);
  app.delete("/deleteOffer/:id", offers.deleteOffer);
}

