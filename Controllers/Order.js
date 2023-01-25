const orders = require('../Models/Orders');

exports.createOrder = async (req,res,next) => {

    if(req.canBeCreated) {
        try{
            if(req.body){
                const {id , datetime , totalfee , services} = req.body ;
                await orders.create({
                    id : id,
                    datetime : datetime,
                    totalfee : totalfee,
                    services : services
                })
                .then((response) => {
                    res.status(201).json({
                        success : true,
                        data : response
                    })
                }).catch((error) => {
                    console.log(error)
                    return res.status(400).json({
                        success : false,
                        data : 'Someting went wrong !'
                    })
                })
            }
        }
        catch(err){
            console.log(err)
            return res.status(400).json({
                success : false,
                data : 'Someting went wrong !'
            })
        }
    }
    else{
        return res.status(400).json({
            success : false,
            data : 'Please try after sometime'
        })
    }

}

exports.getAllOrders = async (req,res,next) => {
    try{
        const Orders = await orders.findAll()
        if(Orders){
            return res.status(202).json({
                success : true,
                Message : Orders
            })
        }
        return res.status(400).json({
            success : false,
            Message : 'No order Found, Order Something !!' 
        })
    }
    catch(err){
        console.log(err)
    }
}

exports.getOrderById = async (req,res,next) => {
    const Id = req.params.id
    try{
        const Order = await orders.findOne({
            where : {
                id : Id
            }
        })
        if(Order){
            res.status(200).json({
                success : true,
                Order : Order
            })
        }
        else{
            res.status(400).json({
                success : false,
                Message : 'No order Found, Order Something !!' 
            })
        }
    }catch(error){
        console.log(error)
    }
}

exports.deleteOrder = async (req,res,next) => {
    const Id = req.params.id

    try{
        const Order = await orders.findOne({
            where : {
                id : Id
            }
        })
        if(Order){
            await orders.destroy({
                where : {
                    id : Id
                }
            }).then(
                res.status(200).json({
                    success : true,
                    message : 'Order deleted successfully'
                })
            )
        }
        else{
            res.status(400).json({
                success : false,
                data : 'Order not Found !'
            })
        }

    }catch(err){
        console.log(err)
    }
}

exports.updateOrder = async (req,res,next) => {

    if(req.canBeCreated){
        try{
            const {id , datetime , totalfee , services} = req.body ;
    
            const Order = await orders.findOne({
                where : {
                    id : id
                }
            })
            if(Order) {
                orders.update(
                    {
                        datetime : datetime,
                        totalfee : totalfee,
                        services : services
                    },
                    {
                        where : {
                            id : id
                        }
                    }
                ).then(
                    res.status(201).json({
                        success : true ,
                        data : req.body
                    })
                )
            }
            else{
                res.status(400).json({
                    success : false,
                    data : 'Someting went wrong !'
                })
            }
        }
        catch(err){
            console.log(err)
        }
    }
    else{
        res.status(400).json({
            success : false,
            data : 'Please try after sometime'
        })
    }
}