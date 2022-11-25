//requiring basic module
const express = require("express")
const router =  express.Router();

const { createOrder , getAllorder , deleteOrder , updateOrder} = require("../../assingment/controlers/order")

//router to make order 
router.post("/create_order" , createOrder);

//router to get all order
router.get("/get_all_order" ,  getAllorder )

//router to delete  order
router.put("/delete_order" ,  deleteOrder )

//router to delete  order
router.put("/update_order" ,  updateOrder )



module.exports = router


