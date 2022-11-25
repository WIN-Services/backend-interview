const { order } = require("../../assingment/modules/order");

//for creating order
exports.createOrder = async (req , res)=>{
     var  today =  new Date()
  try{
    var getOrder  = await order.find().sort({_id: -1}).limit(1)
    if(getOrder != null ){
      var order_date = getOrder[0].createdAt
      const timestampSeconds = Math.floor(order_date.getTime() / 1000);
       const timestamp = Math.floor(today.getTime() / 1000);
       var diff = (timestamp - timestampSeconds)/3600
       if(diff<3){
         console.log(diff,'differenec')
         return res.status(403).json({
          "isSucess":false, 
          "message":"You Cannot create an order",
          "data":response,
          "status":403
       })
      }else{
        var newOrder = new order(req.body)
      var response = await newOrder.save()
      return res.status(200).json({
        "isSucess":true, 
        "message":"successfull request",
        "data":response,
        "status":200
     })
      }
    }else{
       var newOrder = new order(req.body)
      var response = await newOrder.save()
      return res.status(200).json({
        "isSucess":true, 
        "message":"successfull request",
        "data":response,
        "status":200
     })
    }

  }catch(err){

      console.log(err)
      return res.status(500).json({
            "isSuccess": false,
            "message":"internal error server",
            "data": {},
            "status": 500
      })

  }
}

//for getting all the services
exports.getAllorder = async (req , res)=>{
  try{
      
      // var resultArray =[]
      var allorder  = await order.find()

      if(!allorder){
        return res.status(404).json({
          "isSucess":false, 
          "message":"Data Not Find",
          "data":[],
          "status":200
       })
      }else{
        return res.status(200).json({
          "isSucess":true, 
          "message":"successfull request",
          "data":allorder,
          "status":200
       })
      }

     

  }catch(err){
      console.log(err)
      return res.status(500).json({
            "isSuccess": false,
            "message":"internal error server",
            "data": {
            },
            "status": 500
      })
  }
}

//for getting all the services
exports.updateOrder  = async (req , res)=>{
  try{ 
    var  today =  new Date()
    var getOrder  = await order.find().sort({_id: -1}).limit(1)
    if(getOrder != null){
      var order_date = getOrder[0].updatedAt
      const timestamp1 = Math.floor(order_date.getTime() / 1000);
       const timestamp = Math.floor(today.getTime() / 1000);
       var diff = (timestamp - timestamp1)/3600
       if(diff < 3 ){
        return res.status(403).json({
          "isSucess":false, 
          "message":"You Cannot update an order",
          "data":{},
          "status":403
       })
       }else{
        var _id = req.body._id;
        var totalfee = req.body.totalfee;
        //  console.log(_id,name,"updateservice")
        var updateservice = await order.findByIdAndUpdate(_id ,{ totalfee : totalfee},{
            new : true
        });
        console.log(updateservice,"updateservice")
        return res.status(200).json({
            "isSucess":true, 
            "message":"successfull request",
            "data":{
                "totalfee":updateservice.totalfee,
            },
            "status":200
         })
       }
    }else{

    
      var _id = req.body._id;
        var totalfee = req.body.totalfee;
        //  console.log(_id,name,"updateservice")
        var updateservice = await order.findByIdAndUpdate(_id ,{ totalfee : totalfee},{
            new : true
        });
        console.log(updateservice,"updateservice")
        return res.status(200).json({
            "isSucess":true, 
            "message":"successfull request",
            "data":{
                "totalfee":updateservice.totalfee,
            },
            "status":200
         })
      }

  }catch(err){
      console.log(err)
      return res.status(500).json({
            "isSuccess": false,
            "message":"internal error server",
            "data": {
            },
            "status": 500
      })
  }
}


//Delete a service
exports.deleteOrder = async(req ,res)=>{
  // var _id = parseInt(req.params.id)
  var _id = req.body.id
  try{
      var deleteservice = await order.findByIdAndDelete(_id)
       if(!deleteservice){
          return res.status(404).json({
              "isSuccess":false,
              "message":"Data Not Found",
              "data":{},
              "status":404
          })
      }else{
          return res.status(200).json({
              "isSuccess":true,
              "message":"successfull request",
              "data":{
                  "respond":"Successfully Deleted"
              },
              "status":200
          })
      }
  }catch(err){
      console.log(err)
      return res.status(500).json({
          "issuccess":false,
          "message":"Internal Server Error",
          "data":{},
          "status":500
      })
  }
}