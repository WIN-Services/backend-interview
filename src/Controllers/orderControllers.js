const db = require("../models/index");
const orderValidator = require("./validators/validate");
const {validateInputs}=require('../helper/shareMethods');
const orders = db.tbl_order_masters;
const services = db.tbl_service_masters;
const orderService=db.tbl_order_service_mappings;

/**
 * Get All Order Lists:
 * @author Himanshu Pandey
 * @param {*} req
 * @param {*} res
 */
const getAllOrders = async (req, res) => {
  try {
    const getOrders = await orders.findAll({
      attributes: ['id', ['createdAt', 'datetime'], 'totalFee'],
      include: [
        {
          model: services,
          through:{ attributes:[] },
          as: 'services',
          attributes: ['id'],
        },
      ],
    });
    if (getOrders.length > 0) {
      return res.status(200).json({
        message: "Get All Order Lists",
        Orders: getOrders,
      });
    }
    return res.status(200).json({
      message: "No Order Found !",
      Orders: [],
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error !!",
    });
  }
};

/**
 * Get Orders By Id:
 * @author Himanshu Pandey
 * @param {*} req
 * @param {*} res
 */
const getOrdersById = async (req, res) => {
  try {
    const orderId = req.params.id;

    const isOrderExist = await orders.findOne({
      attributes: ["id", ["createdAt", "datetime"], "totalFee"],
      where: {
        id: orderId,
      },
      include: [
        {
          model: services,
          through: { attributes: [] },
          as: "services", 
          attributes: ["id"] 
        },
      ],
    });
    if (isOrderExist) {
      return res.status(200).json({
        message: "Get your Order !  ",
        Orders: isOrderExist,
      });
    }
    return res.status(200).json({
      message: "No order Found !!",
      Orders:[]
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error !!",
    });
  }
};

/**
 * Create New Orders:
 * @author Himanshu Pandey
 * @param {*} req
 * @param {*} res
 */
const createOrders = async (req, res) => {
  try {
    const inputData = {
      totalFee: req.body?.totalFee,
    };

    const isValid= validateInputs(orderValidator.orderSchema,inputData);
    if (isValid.status==400) {
      return res.status(400).json({
        message: isValid.error,
      });
    }
    // Insert New Order:
    const createOrder = await orders.create(inputData);
    return res.status(201).json({
      message: "Order Created Successfully !!",
      Created: createOrder,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error !!",
    });
  }
};

/**
 * Update-Order API
 * @author Himanshu Pandey
 * @param {*} req
 * @param {*} res
 */
const updateOrders = async (req, res) => {
  try {
   
    const orderId = req.params.id;
    const updateBody = {
      totalFee: req.body?.totalFee,
    };
    const isOrderExist = await orders.findOne({
      attributes: ["id", "createdAt","totalFee"],
      where: {
        id: orderId,
      },
    });
    if (!isOrderExist) {
      return res.status(200).json({
        message: "No Order Found !! ",
        Orders:[]
      });
    } 
      const createdTime = isOrderExist?.createdAt;
      const createdTimeMs = createdTime.getTime();
      const currentDate = new Date();
      const currentTimeMs = currentDate.getTime();
      const timeDiff = currentTimeMs - createdTimeMs;
      if (timeDiff < 108000000) {
        return res.status(200).json({
          message: "Order will not Updated",
        });
      }
      // InputSchema Validation:
    const isValid= validateInputs(orderValidator.orderSchema,updateBody);
    if (isValid.status==400) {
      return res.status(400).json({
        message: isValid.error,
      });
    }
      // Update Order:
    const updateOrder = await orders.update(updateBody, {
      where: {
        id: orderId,
      },
    });
    return res.status(200).json({
      message: "Order Updated Successfully!!",
      updated: updateOrder,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error!!",
    });
  }
};

/**
 * Delete Order API:
 * @author Himanshu Pandey
 * @param {*} req
 * @param {*} res
 */
const deleteOrderById = async (req, res) => {
  try {
    const orderId=req.params.id;
    const findOrder=await orders.findOne({
      where:{
        id:orderId
      }
    })
    if(findOrder){
      await findOrder.destroy();
      await orderService.destroy({
        where:{
          orderId:orderId,
        }
      });
      return res.status(200).json({
        message:'Order Record Deleted Successfully'
      })
    }
    return res.status(200).json({
      message:'No Record Found !',
      OrderRecords:[]
    })
  } catch (error) {
    return res.status(500).json({
      message:'Internal Server!!',
     })
  }
};

const orderControllers = {
  getAllOrders,
  getOrdersById,
  createOrders,
  updateOrders,
  deleteOrderById,
};
module.exports = orderControllers;
