const {uid} = require('uid');
const {connectToDB} = require('../utils/connection')
const {ORDER_COLLECTION} = require("../constants/db_constants")
const {calculateServiceCost} = require("./service")
const {INVALID_ORDER_ID,TIME_CREATION_ERROR} = require("../constants/error_constants")

async function addOrders(services,userId){
	try{
		const serviceCost = await calculateServiceCost(services);
		await verifyServiceTimeForOrders(services);
		const collection = await connectToDB(ORDER_COLLECTION);
		const doc = { 
			_id: uid(5),
			dateTime: getTimestamp(),
			totalFee: serviceCost,
			services: services,
			userId : userId
		};
		await collection.insertOne(doc);
		return "Orders Added"
	}

	catch(err){
		console.log("ERR in addOrders",err)
		throw err;
	}
}

async function getOrderByID(orderId){
	try{
		const collection = await connectToDB(ORDER_COLLECTION);
		const result = await collection.findOne({_id : orderId});
		if(result){
			return result
		}
		throw new Error(INVALID_ORDER_ID)
	}
	catch(err){
		throw err;
	}
}

async function deleteOrderByID(orderId){
	try{
		const collection = await connectToDB(ORDER_COLLECTION);
		const result = await collection.deleteOne({_id : orderId});
		if(result.deletedCount == 0)
			throw new Error(INVALID_ORDER_ID)
		if(result){
			return result
		}
	}
	catch(err){
		throw err;
	}
    
}

async function updateOrderByID(orderId,services){
	try{
		const collection = await connectToDB(ORDER_COLLECTION);
		await getOrderByID(orderId)
		await verifyServiceTimeForOrders(services);
		const serviceCost = await calculateServiceCost(services);
		await collection.updateOne({_id : orderId},{$set: {services:services,totalFee:serviceCost}});
		return "Orders Updated"

	}
	catch(err){
		throw err;
	}
}

async function getAllOrders(){
	try{
		const collection = await connectToDB(ORDER_COLLECTION);
		const result = await collection.find().toArray();
		return result;
	}
	catch(err){
		throw err;
	}
}

async function verifyServiceTimeForOrders(services){
	const serviceList = services.map(service => service.id);
	console.log(serviceList)
	const ordersData = await getAllOrders();
	ordersData.forEach((orders)=>{
		const hrsDifference = calculateTimeDifference(orders.dateTime,getTimestamp());
		if(hrsDifference < 3){
			const isPresent = orders.services.some(obj =>
				serviceList.find(item => obj.id === item)
			);
			if(isPresent)
				throw new Error(TIME_CREATION_ERROR)
		}
	})

}

function getTimestamp() {
	return new Date().toISOString();
}

function calculateTimeDifference(startTimestamp, endTimestamp) {
	const startTime = new Date(startTimestamp).getTime();
	const endTime = new Date(endTimestamp).getTime();
	const timeDifferenceInHrs = (endTime - startTime) / (1000 * 60 * 60);
	return timeDifferenceInHrs;
}
module.exports = {
	addOrders,
	getOrderByID,
	deleteOrderByID,
	updateOrderByID,
	getAllOrders
}