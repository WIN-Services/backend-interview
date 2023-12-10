const {connectToDB} = require('../utils/connection')
const {SERVICE_COLLECTION} = require("../constants/db_constants")
const {uid} = require('uid');
const {INVALID_SERVICE_ID} = require("../constants/error_constants")


async function addService(serviceName,fees){
	const collection = await connectToDB(SERVICE_COLLECTION);
	const doc = { 
		_id: uid(5),
		name: serviceName,
		fees: fees
	};
	await collection.insertOne(doc);
	return "Service Added";
}

async function getAllService(){
	const collection = await connectToDB(SERVICE_COLLECTION);
	const result = await collection.find({}).toArray();
	return result;
}

async function calculateServiceCost(serviceData){
	const services =  await getAllService();
	let totalFees = 0;
	serviceData.forEach((data)=>{
		const serviceDetails = services.find(item => item._id === data.id);
		console.log(serviceDetails);
		if(!serviceDetails)
			throw new Error(INVALID_SERVICE_ID)
		if(serviceDetails.fees)
			totalFees = totalFees + Number(serviceDetails.fees)
		return totalFees;
	})
}

module.exports = {
	calculateServiceCost,
	addService,
	getAllService
}