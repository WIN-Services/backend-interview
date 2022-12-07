const ordersRouter=require("express").Router();

const {getAllOrders,addNewOrder,updateOrder,deleteOrder}=require("../services/order.service")


ordersRouter.get("/orders",getAllOrders);

ordersRouter.post("/addOrder",addNewOrder)

ordersRouter.put("/updateOrder", updateOrder)

ordersRouter.delete("/deleteOrder",deleteOrder)


module.exports=ordersRouter;