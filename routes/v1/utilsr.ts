import { Request,Response, Router} from "express";
import utilFunctions from "../../controller/v1/utils"

const router: Router = Router();

router.get("/orders_services/:serviceId",utilFunctions.getOrdersByservice);

export default router