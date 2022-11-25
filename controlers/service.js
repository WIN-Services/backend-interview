const {services} = require("../modules/services")

//for creating services
exports.createServices = async (req , res)=>{

    try{
        var newService = new services(req.body)
        var response = await newService.save()



        return res.status(200).json({
            "isSucess":true, 
            "message":"successfull request",
            "data":response,
            "status":200
         })

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
exports.getAllServices  = async (req , res)=>{
    try{
        
        // var resultArray =[]
        var allservices  = await services.find()
        console.log(allservices,"allservices")

        // for(var i = 0 ; i < allretailer.length ; i++ ){

        //     if(allretailer[i].wholesalerId.length == 1){
        //         resultArray.push(allretailer[i])
        //     }else{
        //         continue;
        //     }
        // }


        return res.status(200).json({
            "isSucess":true, 
            "message":"successfull request",
            "data":allservices,
            "status":200
         })

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
exports.updateServices  = async (req , res)=>{
    try{
        var _id = req.body._id;
        var name = req.body.name;
         console.log(_id,name,"updateservice")
        var updateservice = await services.findByIdAndUpdate(_id ,{
            name : name
        },{
            new : true
        });
        console.log(updateservice,"updateservice")
        return res.status(200).json({
            "isSucess":true, 
            "message":"successfull request",
            "data":{
                "Title":updateservice.name,
            },
            "status":200
         })

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
exports.deleteServices = async(req ,res)=>{
    // var _id = parseInt(req.params.id)
    var _id = req.body.id
    try{
        var deleteservice = await services.findByIdAndDelete(_id)
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