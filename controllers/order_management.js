const order = require("../model/order");
const service = require("../model/service");

const addOrders = (req, res) => {
	try{
		let reqBody = req.body;
		console.log("Request Recieved:", reqBody)
		if( 'totalFee' in reqBody && 'serviceName' in reqBody){
			let currentDate = new Date()
			let threeHoursBackTime = new Date( new Date().setUTCHours( currentDate.getUTCHours() -3 ))
			console.log(" currentDate: ", currentDate, "threeHoursBackTime", threeHoursBackTime)
			let queryObj = {
				'dateTime': {$gt: threeHoursBackTime}
			}
			order.find(queryObj).then( orderList => {
				console.log("order list: ", orderList)
				if( orderList && orderList.length > 0){
					console.log("order exist in three hours interval.")
					return res.status(400).json({status: 0, message: " cannot place order, order exist in three hours interval."})
				} else {
					let serviceObj = {
						'serviceName': reqBody['serviceName']
					}
					service.findOne(serviceObj).then( serviceDetails => {
						if( serviceDetails ){
							let orderObj = new order({
								'dateTime': new Date(),
								'totalFee': reqBody['totalFee'],
								'services': {"id": serviceDetails['_id']}
							})
							orderObj.save().then( doc => {
								console.log("order Successsfully saved!!!")
								return res.status(200).json({status: 0, message: "order added successsfully."})
							}).catch( err => {
								console.log(" Error in saving order details:", err)
							return res.status(400).json({status: 0, message: " Error in saving order details"})
							})
						} else {
							console.log(" service not exist.")
							return res.status(400).json({status: 0, message: "Requested service not exist."})
						}
					}).catch( err => {
						console.log(" Error in fetching service details: ", err)
						return res.status(400).json({status: 0, message: " Error in fetching service details."})
					})
				}
			}).catch( err => {
				console.log(" Error in fetching order details: ", err)
				return res.status(400).json({status: 0, message: " Error in fetching order details."})
			})
		} else {
			console.log(" Required parameters are missing.")
			return res.status(400).json({status: 0, message: " Required parameters are missing."})
		}
	} catch( err ){
		console.log("Error in adding order: ", err)
		return res.status(400).json({status: 0, message: "Error in adding order."})
	}
}

const fetchOrder = async (req, res) => {
			try{
				let reqQuery = req.query
				console.log(" Request recieved: ", req.query)
				if("id" in reqQuery){
					let orderDetails =  await order.findById(reqQuery['id']);
					// order.findById( reqPa)
					console.log("orderDetails:", orderDetails)
					if(!orderDetails){
						console.log("Order doesn't exist");
						return res.status(400).json({status: 0, message: "order doesn't exist."})
					}
					else{
						console.log("Order fetched successfully", order)
						return res.status(200).json({status: 0, message: "order fetched successsfully.", data: orderDetails})
					}
				} else {
					console.log("Required parameter id is misssing.")
					return res.status(400).json({status: 0, message: "Required parameter id is misssing."})
				}
			}catch(error){
					console.log("Error occured in getting orderlist", error);
					return res.status(400).json({
						error: error
					});
			}
}

const fetchAll = async (req, res) => {
	try{
		let orders = await order.find();
		if(!orders){
			return res.status(404).json({
				message: "Order is not exist",
				data: null
			})
		}else{
			console.log(" All orders fetched successfully: ", orders)
			return res.status(200).json({status: 0, message: "order fetched successsfully.", data: orders})
		}
	} catch( err ){
		console.log("Error in fetching orderList: ", err)
		return res.status(400).json({status: 0, message: "Error in fetching orderList."})
 }
}

const deleteOrder = async ( req, res) => {
	try{
		let reqQuery = req.query
			console.log(" Request recieved: ", req.query)
			if("id" in reqQuery){
				let orderDelete = await order.findByIdAndDelete(reqQuery['id']);
				if ( !orderDelete ){
					console.log("order doesn't exist with the requested id.")
					return res.status(400).json({status: 0, message: "order doesn't exist with the requested id."})
				} else {
					console.log(" order deleted Successfully: ", orderDelete)
					return res.status(200).json({status: 0, message: "order deleted successsfully.", data: orderDelete})
				}
			} else {
				console.log("Required parameter id is misssing.")
				return res.status(400).json({status: 0, message: "Required parameter id is misssing."})
			}
	} catch( error){
		console.log("Error in deleting order: ", error)
		return res.status(400).json({status: 0, message: "Error in deleting order."})
	}
}

const updateOrder = async ( req, res) => {
	try{
		let reqBody = req.body;
		console.log("Request Recieved:", reqBody)
		if( 'id' in reqBody && 'totalFee' in reqBody && 'serviceName' in reqBody){
			let serviceObj = {
				'serviceName': reqBody['serviceName']
			}
			let serviceDetails = await service.findOne(serviceObj)
				if( serviceDetails ){
					let updateObj = {
						'dateTime': new Date(),
						'totalFee': reqBody['totalFee'],
						'services': {"id": serviceDetails['_id']}
					}
					let updateDetails = await order.findByIdAndUpdate( reqBody['id'], updateObj)
					if( !updateDetails ){
						console.log(" order doesn't exist with the requested id.")
						return res.status(400).json({status: 0, message: "order doesn't exist with the requested id."})
					} else {
						console.log(" order updated Successfully: ", updateDetails)
						return res.status(200).json({status: 0, message: "order updated successsfully.", data: updateDetails})
					}
				}
		} else {
			console.log(" Required parameters are missing.")
			return res.status(400).json({status: 0, message: " Required parameters are missing."})
		}
	} catch( error){
		console.log("Error in updating order: ", error)
		return res.status(400).json({status: 0, message: "Error in updating order."})
	}
}

module.exports = {
	addOrders,
	fetchOrder,
	fetchAll,
	deleteOrder,
	updateOrder
}