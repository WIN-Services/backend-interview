import { Request,Response, Router} from "express";
import orderFunctions from "../../controller/v1/orders"

const router: Router = Router();

router.get("/",orderFunctions.getallOrders);

router.get("/:id",orderFunctions.getUserOrders);

router.post("/:id",orderFunctions.addOrder);

router.put("/:orderId",orderFunctions.updateOrder);

router.delete("/:orderId",orderFunctions.deleteOrder);

export default router