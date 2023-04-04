const {orders} = require('../model/model');

exports.getAllOrders = async(req,res,next) => {
    try{
        const Orders = await orders.find({});
        if(Orders){
        return res.status(200).json(Orders)
        }
        return res.status(400).json({
            success : false,
            Message : 'Orders not found!' 
        })
    }
    catch(err){
        console.log(err)
    }
}

exports.getOrderById = async(req,res,next) => {
    try {
      const { id } = req.params
      const data = await orders.find({
        orderid: id
      });
      console.log(data)
       if(data === null || data.length === 0){
        return res.status(400).json({
            success : false,
            Message : 'Order not found!' 
        })
       }
      return res.status(200).json(data)
    } catch (error) {
        console.log('error')
    }
  }


exports.OrderDelete = async (req,res,next) => {
    try{
        const { id } = req.params
        const data = await orders.find({
        orderid: id
      });
      console.log(data)
        if(data === null || data.length === 0){
            res.status(400).json({
                success : false,
                data : 'Order does not exist!'
            }) 
        }
        const uniqueid = data[0]._id.toString()
        await orders.findByIdAndDelete(uniqueid).then(
            res.status(200).json({
                    success : true,
                    message : 'Order got deleted!'
            })
            ).catch(err => res.status(500).send(err));
    }catch(err){
        console.log(err)
    }
}

exports.createOrder = async (req,res,next) => {

    if(req.canBeCreated) {
        try{
            if(req.body){
                const { orderid, totalfee, services } = req.body; // extract the required fields from the request body

                const newOrder = new orders({
                  orderid,
                  totalfee,
                  services
                });
                await newOrder.save();
                return res.status(201).json(newOrder);
            }
        }
        catch(err){
            console.log(err)
            return res.status(400).json({
                success : false,
                data : 'Could not create a new entry!'
            })
        }
    }
    else{
        return res.status(400).json({
            success : false,
            data : 'Please try again later!'
        })
    }

}


exports.updateOrder = async (req,res,next) => {

    if(req.canBeCreated){

        const { id } = req.params; // get the custom ID from the request params
        const update = req.body; // get the update fields from the request body
        console.log(id)
        try{
          const updatedDoc = await orders.findOneAndUpdate({ orderid: id }, update, { new: true });
          console.log(updatedDoc)
          if (!updatedDoc) {
            res.status(404).send('Document not found');
            return;
          }
          res.json(updatedDoc.toJSON());
        } catch (error) {
          console.error(error);
          res.status(500).send('Error updating document');
        }
    }
    else{
        res.status(400).json({
            success : false,
            data : 'Please try after sometime'
        })
    }
}


