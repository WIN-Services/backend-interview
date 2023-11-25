import orders from '../schema/orders';
import mongoose from 'mongoose';

async function getAllOrders(req: any, res: any) {
    const ordersData = await orders.find();
    const jsonData = {
        totalOrders : ordersData.length,
        orders: ordersData,
        message: 'Orders fetched successfully'
    }
    return res.status(200).send(jsonData);
}

async function addNewOrder(req: any, res: any) {
    try{
        const {data} = req?.body;
        if(!Object.keys(data).length){
            return res.status(400).send('Kindly add the Order Name');
        }else{
            const threeHoursAgo = new Date();
            threeHoursAgo.setHours(threeHoursAgo.getHours() - 3);
            const existingOrder = await orders.findOne({
              datetime: { $gt: threeHoursAgo },
            });
            if (existingOrder) {
              return res.status(400).json({
                error: "An order is already created within 3 hours. Kindly wait for some more time to create new order!",
              });
            }
            const newOrder = new orders({
                totalFee: data.totalFee,
                services: data.services,
                dateTime: new Date(),
                updatedAt: new Date()
            });
            await newOrder.save().then(() => {
                return res.status(200).send({message: 'Order created successfully'})
            });
        }
    }catch(err){
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
}

async function getOrderById(req: any, res: any){
    try{
        const id = req?.params?.id;
        const data = await orders.findOne({_id: mongoose.Types.ObjectId(id.toString())});
        if(data){
            res.status(200).json(data);
        }else{
            return res.status(404).send('Order not found');
        }
    }catch(err){
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
}

async function deleteOrderById(req: any, res: any){
    try{
        const id = req?.params?.id;
        console.log(id);
        const data = await orders.findOne({_id: mongoose.Types.ObjectId(id.toString())});
        if(data){
            await orders.deleteOne({_id: mongoose.Types.ObjectId(id.toString())})
            res.status(200).send('Order deleted');
        }else{
            return res.status(404).send('Order not found');
        }
    }catch(err){
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
}

async function updateOrder(req: any, res: any){
    try{
        const existingOrder = await orders.findById(req?.params?.id);
        if(!existingOrder){
            return res.status(404).send({ error: "Order not found" });
        }
        const afterthreeHours = new Date();
        afterthreeHours.setHours(afterthreeHours.getHours() + 3);
        // to check if existing order was created 3 hrs before or not
        if (existingOrder.datetime < afterthreeHours) {
            return res.status(400).send({error:"Order cannot be updated; it was created less than 3 hours ago."});
        }
        const updatedOrder = await orders.findByIdAndUpdate(
        req?.params?.id,
        {
            ...req?.body?.data,
            updatedAt: new Date()
        },
        { new: true }
        );
        if (!updatedOrder) {
        return res.status(404).send({ error: "Order not found" });
        }
        return res.send({ 
            message: "Order updated successfully",
            data: updatedOrder,
        });
    }catch(err){
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
}

export{
    getAllOrders,
    addNewOrder,
    getOrderById,
    deleteOrderById,
    updateOrder
}