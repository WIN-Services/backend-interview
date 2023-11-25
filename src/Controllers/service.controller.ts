import services from '../schema/services';
import mongoose from 'mongoose';

async function getAllServices(req: any, res: any) {
    const servicesData = await services.find({isDeactive: false});
    const jsonData = {
        totalServices : servicesData.length,
        services: servicesData,
        message: 'Services fetched successfully'
    }
    return res.status(200).send(jsonData);
}

async function addNewService(req: any, res: any) {
    try{
        if(!Object.keys(req?.body?.data).length){
            return res.status(400).send('Kindly add the service Name');
        }else{
            const data = req?.body?.data;
            const {name} = data; 
            if(name){
                const checkIfServiceAlreadyExists = await services.count({name, isDeactive: false});
                console.log(checkIfServiceAlreadyExists);
                if(checkIfServiceAlreadyExists){
                    return res.status(400).send('Service is already present');
                } else {
                    await services.updateOne({name, isDeactive: true},{isDeactive: false}).then(async(d: any) => {
                        if(d?.nModified){
                            return res.status(200).send({message: 'Service created successfully', data: {name}})
                        } else {
                            const newService = new services({name, isDeactive: false});
                            await newService.save().then(() => {
                                return res.status(200).send({message: 'Service created successfully', data: {name}})
                            });
                        }
                    });
                }
            }else{
                return res.status(400).send('Kindly add the service Name');
            }
        }
    }catch(err){
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
}

async function getServiceById(req: any, res: any){
    try{
        const id = req?.params?.id;
        console.log(id);
        const data = await services.findOne({_id: mongoose.Types.ObjectId(id.toString()), isDeactive: false});
        if(data){
            res.status(200).json(data);
        }else{
            return res.status(404).send('Service not found');
        }
    }catch(err){
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
}

async function deleteServiceById(req: any, res: any){
    try{
        const id = req?.params?.id;
        console.log(id);
        const data = await services.findOne({_id: mongoose.Types.ObjectId(id.toString()), isDeactive: false});
        if(data){
            await services.updateOne({_id: mongoose.Types.ObjectId(id.toString())},{isDeactive: true})
            res.status(200).send('Service deleted');
        }else{
            return res.status(404).send('Service not found');
        }
    }catch(err){
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
}

async function updateService(req: any, res: any){
    try{
        if(!Object.keys(req?.body?.data).length){
            return res.status(400).send('Kindly add the service Name');
        } else {
            const id = req?.params?.id;
            console.log(id);
            const data = await services.findOne({_id: mongoose.Types.ObjectId(id.toString()), isDeactive: false});
            if(data){
                await services.updateOne({_id: mongoose.Types.ObjectId(id.toString())},{name: req?.body?.data?.name})
                res.status(200).send('Service updated');
            }else{
                return res.status(404).send('Service not found');
            }
        }
    }catch(err){
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
}

export{
    getAllServices,
    addNewService,
    getServiceById,
    deleteServiceById,
    updateService
}