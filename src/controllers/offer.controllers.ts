import { Request, Response } from "express";
import {validationResult} from 'express-validator';
import { OfferService } from "../services/offer.service";
import { OfferRepo } from "../repository/offer.repo";
const offerService = new OfferService(new OfferRepo());

export class offerController {
  constructor() { }
  async addOffer(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const arg = await offerService.addOffer(req.body);
    return res.status(arg.status).json(arg);
  }

  async getOffer(req: Request, res: Response) {
    const id = req.params?.id;
    const arg = await offerService.getOffer(id);
    return res.status(arg.status).json(arg);
  }

  async getOfferList(req: Request, res: Response) {
    const arg = await offerService.getOfferList();
    return res.status(arg.status).json(arg);
  }

  async editOffer(req: Request, res: Response) {
    const id = req.params?.id;
    const arg = await offerService.editOffer(id,req.body);
    return res.status(arg.status).json(arg);
  }

  async deleteOffer(req: Request, res: Response) {
    const id = req.params?.id;
    const arg = await offerService.deleteOffer(id);
    return res.status(arg.status).json(arg);
  }

}
