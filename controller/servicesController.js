const Service = require('../models/services');

module.exports.create = async function( req , res ){

    try{
        if(!req.body.name){
            return res.status(400).json({
                message : "Please paas the required value"
            });
        }
    
        let service = await Service.create({name: req.body.name });
    
        return res.status(200).json({
            message : "Service Created",
            service : service,
            error : null
        });
    }
    catch(err){
        console.log("Error occur in creating service ",err);
        return res.status(400).json({
            error : err
        });
    }
}

module.exports.get = async function( req , res ){

    try{
        let service = await Service.findById(req.params.id);

        res.status(200).json({
            message: "Services fetched",
            data: service,
        });
    }
    catch(err){
        console.log("Error occur in getting service ",err);
        return res.status(400).json({
            error : err
        });
    }
}


module.exports.getAll = async function( req , res ){

    try{
        let services = await Service.find({});

        res.status(200).json({
            message: "All Services fetched",
            data: services,
        });
    }
    catch(err){
        console.log("Error occur in getting service ",err);
        return res.status(400).json({
            error : err
        });
    }
}

module.exports.update = async function( req , res ){

    try{

        if(!req.body.name){
            return req.status(400).json({
                message : "Please pass some value for update"
            })
        }
    
        let service = await Service.findByIdAndUpdate(req.params.id , {name : req.body.name});
    
        if(!service){
            return res.status(404).json({
                message : "Service Not Exist"
            })
        }

        res.status(200).json({
            message: "Service Updated Successfully",
            data: service,
          });

    }
    catch(err){
        console.log("Error occur in update service ",err);
        return res.status(400).json({
            error : err
        });
    }
}

module.exports.delete = async function( req , res ){
    try{
        let service = await Service.findByIdAndDelete( req.params.id );

        if(!service){
            return res.status(404).json({
                message : "Service Not Exist to delete"
            })
        }

        res.status(200).json({
            message: "Service deleted Successfully",
            data: service,
          });

    }
    catch(err){
        console.log("Error occur in update service ",err);
        return res.status(400).json({
            error : err
        });
    }
}