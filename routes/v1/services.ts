import { Request,Response, Router} from "express";
import serviceFunctions from "../../controller/v1/services"

const router: Router = Router();

router.get("/",serviceFunctions.getServices);

router.post("/",serviceFunctions.addService);

router.put("/:id",serviceFunctions.updateService);

router.delete("/:id",serviceFunctions.deleteService);

export default router