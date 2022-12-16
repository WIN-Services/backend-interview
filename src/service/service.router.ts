/**
 * Required External Modules and Interfaces
 */

import express, { Request, Response } from "express";
import * as appService from "./services.service";
import { BaseService, Item } from "./service.interface";

/**
 * Router Definition
 */

export const serviceRouter = express.Router();

/**
 * Controller Definitions
 */

// GET services

serviceRouter.get("/services", async (req: Request, res: Response) => {
  try {
    const items = await appService.findAllServices();

    res.status(200).json({ success: true, data: items });
  } catch (e: any) {
    res.status(500).json({ success: false, data: e.message });
  }
});

// GET services/:id

serviceRouter.get("/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);

  try {
    const item: any = await appService.find(id);

    if (item) {
      return res.status(200).json({ success: true, data: item });
    }

    res.status(404).json({ success: true, data: "item not found" });
  } catch (e: any) {
    res.status(500).json({ success: false, data: e.message });
  }
});

// POST services

serviceRouter.post("/", async (req: Request, res: Response) => {
  try {
    const item: BaseService = req.body;

    const newItem = await appService.create(item);

    res.status(201).json({ success: true, data: newItem });
  } catch (e: any) {
    res.status(500).json({ success: false, data: e.message });
  }
});

// PUT services/:id

serviceRouter.put("/update/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);

  try {
    const itemUpdate: Item = req.body;

    const existingItem = await appService.find(id);

    if (existingItem) {
      const updatedItem = await appService.update(id, itemUpdate);
      return res.status(200).json(updatedItem);
    }

    const newItem = await appService.create(itemUpdate);

    res.status(201).json(newItem);
  } catch (e: any) {
    res.status(500).json({ success: false, data: e.message });
  }
});

// DELETE services/:id

serviceRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    const existingItem = await appService.find(id);
    console.log("=============", id, existingItem);
    if (existingItem) {
      const deletedItem = await appService.remove(id);
      return res.status(200).json({ success: true, data: deletedItem });
    }

    res.sendStatus(204).json({ success: true, data: [] });
  } catch (e: any) {
    res.status(500).json({ success: false, data: e.message });
  }
});
