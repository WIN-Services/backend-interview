const orders = require("../model/orders");
var moment = require('moment');


const addNewOrder = async (req, res) => {
  const { id,totalfee, services} = req.body;
  var nowDate = new Date();
  const data = await orders.find({id})
  await orders.findById({id:id}).then(async () =>{
    var updatedTime = moment(data.updateAt).add(3, 'hours')
    var currTime = moment(nowDate)
    if(updatedTime<currTime){
          await orders.findOneAndUpdate({id}, {$push: {services:services}}, {upsert: true}).then((result) => {
            console.log(result)
            res.status(200).json({message: "Successfully Registered", status: 200})
          }).catch((error) => {
            console.log(error)
          })
        }
        else{
          res.status(200).json({message: "you can update data after 3 hours", status: 200})
        }
  }).catch(async () =>{
    try {
      const addOrder = new orders({ id, totalfee, services});
      await addOrder.save();
      res.send(addOrder);
      res.status(200).json({message: "Successfully Registered", status: 200})
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
  }})
 }


const getAnOrderData =  async (req, res) => {
  const { id } = req.params;
  try {
    const orderData = await orders.find({id});
    res.send(orderData);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

const getAllOrderList =  async (req, res) => {
  try {
    const orderList = await orders.find({});
    res.send(orderList);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

const updateOrder = async (req, res) => {
  const { totalfee, services } = req.body;

  try {
    const orderUpdate = await orders.findByIdAndUpdate({_id : req.params.id}, {totalfee, services });
    console.log(orderUpdate)
    res.send(orderUpdate);
    res.status(200).json({message: "Successfully update", status: 200})
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

const deleteOrder = async (req, res) => {
  try {
    const deleteOrder = await orders.findByIdAndDelete({_id : req.params.id});
    res.send(deleteOrder);
    res.status(200).json({message: "Successfully deleted", status: 200})
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

module.exports = {addNewOrder,getAnOrderData,getAllOrderList,updateOrder,deleteOrder}
