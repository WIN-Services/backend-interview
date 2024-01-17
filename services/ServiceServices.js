const service = require('../Models/service')

class serviceServices {

    async createServices (req, res){
        try{

            const { name = null } = req.body;
    
            if (!(name && name.trim().length))
            return {
                error: true,
                message: "something went wrong!",
              };
    
    
              let resp = await service.create({ name });
    
              return {
                error: false,
                message: "saved",
              }
        }catch(err){
            return {
                error: true,
                message: err,
              }
        }

    }

    async getAllServices (req, res) {
        try{
            let resp = await service.find();

            return {
                error: false,
                data: resp,
                message: "fetched",
              }

        }catch(err){
            return {
                error: true,
                message: err,
              }
        }
    }
    async getService (req, res) {
        try{
            const { id: serviceId } = req.body;

            let resp = await service.findOne({
                _id: serviceId
            });

            return {
                error: false,
                data: resp,
                message: "fetched",
              }

        }catch(err){
            return {
                error: true,
                message: err,
              }
        }
    }

    async updateService (req, res) {
        try{
            const { name = null, id: serviceId } = req.body;

            if (!(name && name.trim().length))
            return {
                error: true,
                message: "something went wrong!",
              };

            let resp = await service.updateOne(
                {
                    _id: serviceId,
                  },
                { $set: { name } }
              );

              if (resp.modifiedCount)
            return {
                error: false,
                message: "updated service",
              }

              else
              return {
                error: true,
                message: "something went wrong!",
            }

        }catch(err){
            return {
                error: true,
                message: err,
              }
        }
    }

    async deleteService(req, res){
        const { id: serviceId } = req.body;

        let resp = await service.deleteOne({
                _id: serviceId
          });

          if (resp.deletedCount){    
              return {
                error: false,
                message: "deleted",
              }
          }
          else
            return{
                error: true,
                message: "something went wrong!",
              }
    }

    

}

module.exports = new serviceServices()