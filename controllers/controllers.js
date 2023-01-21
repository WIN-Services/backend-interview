const {
    createOrder, 
    getOrderById, 
    updateOrder,
    deleteOrder,
} = require('../services/services')

const Joi = require('joi')

const schema = Joi.object({
    services: Joi.array().items(Joi.number()).required()
});

const createOrderController = async (req, res) => {
    try{
        let error = new Error()
        const body = req.body;
        const val = schema.validate(body)
        if(val.error){
            error.status = 400
            error.message = val.error.details[0].message
            throw error
        }
        const response = await createOrder(body);
        console.log("camere")
        return res.status(202).json({
            success: true,
            data: response.data
        });
    }catch(e){
        console.log(e)
        if(e.status){
            return res.status(e.status).json({
                success: false,
                "message": `Error while creating an order: ${e.message}`,
            })
        }
        return res.status(500).json({
            success: false,
            "message": `Internal Server Error ${e}`,
        })
    }
}


const getOrderControlller = async (req, res) => {
    try{
        const body = req.params.id;
        console.log(body)
        const response = await getOrderById(body);
        if(response.success){
            res.status(202);
        }else{
            res.status(400)
        }
        return res.json({
            success: true,
            data: response.data
        });
    }catch(e){
        console.log(e)
        if(e.status){
            return res.status(e.status).json({
                success: false,
                "message": `Error while getting an order: ${e.message}`,
            })
        }
        return res.status(500).json({
            success: false,
            "message": `Internal Server Error ${e}`,
        })
    }
}


const updateOrderControlller = async (req, res) => {
    try{
        let error = new Error()
        const id = req.params.id;
        const service = req.body.services;
        
        const val = schema.validate(req.body)
        console.log(val)
        if(val.error){
            error.status = 400
            error.message = val.error.details[0].message
            throw error
        }
        const response = await updateOrder(id, service);
        return res.status(200).json({
            success: true,
            message: response.data
        });
    }catch(e){
        console.log(e)
        if(e.status){
            return res.status(e.status).json({
                success: false,
                "message": `Error while updating an order: ${e.message}`,
            })
        }
        return res.status(500).json({
            success: false,
            "message": `Internal Server Error ${e}`,
        })
    }
}

const deleteOrderControlller = async (req, res) => {
    try{
        const id = req.params.id;
        const response = await deleteOrder(id);
        return res.status(200).json({
            success: true,
            message: response.message
        });
    }catch(e){
        console.log(e)
        if(e.status){
            return res.status(e.status).json({
                success: false,
                "message": `Error while deleting an order: ${e.message}`,
            })
        }
        return res.status(500).json({
            success: false,
            "message": `Internal Server Error ${e}`,
        })
    }
}
module.exports = {
    createOrderController,
    getOrderControlller,
    updateOrderControlller,
    deleteOrderControlller,
  }