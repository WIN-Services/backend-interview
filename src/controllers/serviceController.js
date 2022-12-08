const validator=require('../validator/validations')
const serviceModel = require('../models/serviceModel');

/*create service */
const createService = async (req, res) => {
    try{
        let {name}=req.body

        if (!validator.isValidRequestBody(req.body)) {
            return res.status(400).send({ status: false, message: "Please enter Valid Service Details" })
        }
        if (!validator.isValid(name)) {
            return res.status(400).send({ status: false, message: "service name missing" })
        }

          let service = await serviceModel.create({name});
        
          res.status(200).send({success: true,message: "Service Created Successfully",data: service});

    }catch(error){
        return res.status(500).send({ status: false, message: error.message });
    }
};

/**update service */

const updateService =async (req, res) => {
    try{
        let serviceId=req.params.serviceId
        if (!validator.isValidObjectId(serviceId)) {
            return res.status(400).send({ status: false, message: "invalid serviceId" });
        }

        let findServices= await serviceModel.findById(serviceId)
        if (!findServices) {
            return res.status(404).send({ status: false, message: "no such services found" });
        }
          let service = await serviceModel.findByIdAndUpdate({_id:serviceId},
            { name: req.body.name,},
            {new: true});
        
          res.status(200).json({success: true, message: "Service Updated Successfully",data: service});

    }catch(error){
        return res.status(500).send({ status: false, message: error.message });   
    }
  
};

/**Delete Services */

const deleteService = async (req, res) => {
    try{
let serviceId=req.params.serviceId
if (!validator.isValidObjectId(serviceId)) {
    return res.status(400).send({ status: false, message: "invalid serviceId" });
}

let findServices= await serviceModel.findById(serviceId)
if (!findServices) {
    return res.status(404).send({ status: false, message: "no such services found" });
}
let service = await serviceModel.findByIdAndDelete(serviceId);
  res.status(200).json({success: true,message: `Service Deleted`});

    }catch(error){
        return res.status(500).send({ status: false, message: error.message });  
    }  
};

/**Get All Services */
const getAllService = async (req, res) => {
  let services = await serviceModel.find({});

  res.status(200).json({success: true,message: `All Services fetched Successfully`,data: services});
};


module.exports={createService,updateService,deleteService,getAllService}