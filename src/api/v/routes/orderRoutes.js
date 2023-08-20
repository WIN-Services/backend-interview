const express = require('express');
const {Op} = require('sequelize');
const moment = require('moment');
const DB = require('@models/DB');

const router = express.Router();


router.get('/',async (req,res) => {
    const data = await DB.Orders.findAll({
        include:{
            model:DB.OrderServiceMapping,
            as:'service',
            attributes:['service_id']
        }
    });
    res.status(200).json({
        status:200,
        message:"Data fetched successfully.",
        data:{
            data
        }
    })
});

router.post('/',async (req,res) => {

    const {order} = req.body;
    const now = moment().format('YYYY-MM-DD HH-mm-ss');
    const then = moment().subtract(3,'hour').format('YYYY-MM-DD HH-mm-ss');

    const oldOrder = await DB.Orders.findAll({
        where:{
            datetime:{
                [Op.gte]: then,
                [Op.lte]: now,
            }
        }
    })

        if(oldOrder.length > 0){
            return  res.status(400).json({
                status:"fail",
                message:"You have previous orders",
            })
        }

   const orderCreated =  await DB.Orders.create(order);

    const arr = [];
    for(let item of order.services){
        const obj = {
            order_id: orderCreated.id,
            service_id:item.id
        }
        arr.push(obj);
    }

    await DB.OrderServiceMapping.bulkCreate(arr);

    res.status(200).json({
        status:"success",
        message:"Data created successfully.",
    })

});

router.get('/:id',async (req,res) => {
    const {id} = req.params;
    const order = await DB.Orders.findOne({
        where:{
            id
        },
        include:{
            model:DB.OrderServiceMapping,
            as:'service',
            attributes:['service_id']
        }
    });
    res.status(200).json({
        status:"success",
        message:"Data fetched successfully.",
        data:{
            order
        }
    })
});

router.put('/:id', async (req,res) => {

    const {id} = req.params;
    const {order} = req.body;
    const now = moment().format('YYYY-MM-DD HH-mm-ss');
    const then = moment().subtract(3,'hour').format('YYYY-MM-DD HH-mm-ss');

    const oldOrder = await DB.Orders.findAll({
        where:{
            datetime:{
                [Op.gte]: then,
                [Op.lte]: now,
            }
        }
    })

        if(oldOrder.length > 0){
            return  res.status(400).json({
                status:"fail",
                message:"You have previous orders",
            })
        }

    const data = await DB.Orders.findOne({
        where:{
            id
        },       
    });

    await data.update(order);

    res.status(200).json({
        status:"success",
        message:"Data updated successfully.",
    })

});

router.delete('/:id',async (req,res) => {

    const {id} = req.params;
    await DB.Orders.destroy({
        where:{
            id
        }
    });

    res.status(200).json({
        status:"success",
        message:"Data deleted successfully.",
    })

});

module.exports = router;