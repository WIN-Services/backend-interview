import express from "express";
import { getAllServices, addNewService, getServiceById, deleteServiceById, updateService } from "../Controllers/service.controller";
const router = express.Router();

router.get('/',getAllServices);

router.get('/:id', getServiceById);

router.post('/', addNewService);

router.delete('/:id', deleteServiceById);

router.put('/:id', updateService);
export default router;