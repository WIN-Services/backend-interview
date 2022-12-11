const Order = require('./../models/order');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.createOrder = catchAsync(async (req, res, next) => {
    let { totalfee, services } = req.body

    let preExistOrder = await Order.find({createdAt:{$gt:new Date(Date.now() - 3*60*60 * 1000)}})
   

    if(preExistOrder.length>0 && preExistOrder){

        return next(new AppError('cannot created or update order now', 412));
     }

   
   
     if(!totalfee){
        return next(new AppError('totelfee is not Found', 404));
    }
    if(!services){
        return next(new AppError('services are not Found', 404));
    }


    const order = await Order.create({totalfee,services});
  
    res.status(201).json({
     
      status: 'success',
    data: {
      order
    }
      });
  });


exports.updateOrder = catchAsync(async (req, res, next) => {

    let preExistOrder = await Order.find({createdAt:{$gt:new Date(Date.now() - 3*60*60 * 1000)}})
   

    if(preExistOrder.length>0 && preExistOrder){
        return next(new AppError('cannot created or update order now', 412));
     }
   
    const order = await Order.findByIdAndUpdate(req.params.id , req.body, {
        new: true,
     });
  
    if (!order) {
      return next(new AppError('No order found with that ID', 404));
    }
  
    res.status(200).json({
      status: 'success',
      data: {
        order
      }
    });
  });


exports.getAllOrder = catchAsync(async (req, res, next) => {
    

    const orders =  await Order.aggregate([
   {
    $lookup: {
      from: "services", // collection name in db
      localField: "services",
      foreignField: "_id",
      as: "services"
    }
    },
    {
        $project: {
           _id: 1,
           datetime:"$$NOW",
           totalfee:1,
           services:{
            _id:1,
            name:1
           },
          createdAt:1
        }
     },
])


if (!orders) {
      return next(new AppError('No orders found', 404));
    }
  
    res.status(200).json({
      status: 'success',
      data: {
        orders
      }
    });
  });


exports.getOrder = catchAsync(async (req, res, next) => {
    // const order = await Order.findById(req.params.id);
    const order =  await Order.aggregate([
        
        {
            $match: {isActive :req.params.id }
        },
        {
         $lookup: {
           from: "services", // collection name in db
           localField: "services",
           foreignField: "_id",
           as: "services"
         }
         },
         {
             $project: {
                _id: 1,
                datetime:"$$NOW",
                totalfee:1,
                services:{
                 _id:1,
                 name:1
                },
               createdAt:1
             }
          },
     ])

    
    if (!order) {
      return next(new AppError('No order found with that ID', 404));
    }
  
    res.status(200).json({
      status: 'success',
      data: {
        order
      }
    });
  });
  

exports.deleteOrder = catchAsync(async (req, res, next) => {
    const order = await Order.findByIdAndDelete(req.params.id);
  
    if (!order) {
      return next(new AppError('No order found with that ID', 404));
    }
  
    res.status(204).json({
      status: 'success',
      data: null
    });
  });




