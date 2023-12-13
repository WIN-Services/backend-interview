
const express = require("express");
require("dotenv").config();
const app = express();
app.use(express.json());
const {addOrders,
	getOrderByID,
	deleteOrderByID,
	updateOrderByID,
	getAllOrders} = require("./services/orders")
const {
	getAllService,addService
} = require("./services/service")
const {sendResponse}	= require("./utils/response")
const { MISSING_REQUIRED_FIELDS, ERROR_STATUS_CODES } = require("./constants/error_constants")
const port = 3000;
const auth = require('./authenticate');
// ###### Get Order by ID #####
app.get("/api/order/:id", auth,async  (req, res) => {
	console.log('Get Order by ID:', req.params.id)
	try{
		if(req.params.id){
			const data = await getOrderByID(req.params.id);
			return res.send(sendResponse(200,data))
		}
			
		return res.send(sendResponse(ERROR_STATUS_CODES[MISSING_REQUIRED_FIELDS],MISSING_REQUIRED_FIELDS))
	}
	catch(err){
		return res.send(sendResponse(ERROR_STATUS_CODES[err.message] ?? 500,err.message ?? "Internal Server Error"))
	}

});
// ###### Add New Order #####
app.post("/api/addOrder",auth, async  (req, res) => {
	console.log('Add Orders')
	try{
		if(req.body.services && req.body.services.length > 0){
			const data = await addOrders(req.body.services,req.body.userId ?? 1);
			return res.send(sendResponse(200,data))
		}
		return res.send(sendResponse(ERROR_STATUS_CODES[MISSING_REQUIRED_FIELDS],MISSING_REQUIRED_FIELDS))
	}
	catch(err){
		console.log(err.message,ERROR_STATUS_CODES[err.message])
		return res.send(sendResponse(ERROR_STATUS_CODES[err.message] ?? 500,err.message ?? "Internal Server Error"))
	}
});
// ###### Get All Orders #####
app.get("/api/orders",auth, async  (req, res) => {
	console.log('Get All Orders')
	
	try{
		const data = await getAllOrders();
		return res.send(sendResponse(200,data))
	}
	catch(err){
		console.log(err);
		return res.send(sendResponse(ERROR_STATUS_CODES[err.message] ?? 500,err.message ?? "Internal Server Error"))
		
	}
});
// ###### Delete Order By ID #####
app.delete("/api/order/:id", auth,async  (req, res) => {
	console.log('Delete Order by ID:', req.params.id)

	try{
		if(req.params.id){
			const data = await deleteOrderByID(req.params.id);
			return res.send(sendResponse(200,data))
		}
			
		return res.send(sendResponse(ERROR_STATUS_CODES[MISSING_REQUIRED_FIELDS],MISSING_REQUIRED_FIELDS))
	}
	catch(err){
		console.log(err);
		return res.send(sendResponse(ERROR_STATUS_CODES[err.message] ?? 500,err.message ?? "Internal Server Error"))
	}
});
// ###### Update Order By ID #####
app.patch("/api/order/:id",auth, async  (req, res) => {
	console.log('Update Order by ID:', req.params.id)
	
	try{
		if(req.body.services && req.body.services.length > 0 && req.params.id){
			const data = await updateOrderByID(req.params.id,req.body.services);
			return res.send(sendResponse(200,data))
		}
		return res.send(sendResponse(ERROR_STATUS_CODES[MISSING_REQUIRED_FIELDS],MISSING_REQUIRED_FIELDS))
	}
	catch(err){
		console.log(err);
		return res.send(sendResponse(ERROR_STATUS_CODES[err.message] ?? 500,err.message ?? "Internal Server Error"))
		
	}
});


// ###### Add New Service #####
app.post("/api/addService",auth, async  (req, res) => {
	console.log('Add Service')
	try{
		if(req.body.name){
			const data = await addService(req.body.name,req.body.fees ?? "50");
			return res.send(sendResponse(200,data))
		}
		return res.send(sendResponse(ERROR_STATUS_CODES[MISSING_REQUIRED_FIELDS],MISSING_REQUIRED_FIELDS))
	}
	catch(err){
		console.log(err.message,ERROR_STATUS_CODES[err.message])
		return res.send(sendResponse(ERROR_STATUS_CODES[err.message] ?? 500,err.message ?? "Internal Server Error"))
	}
});
// ###### Get All Service #####
app.get("/api/services",auth, async  (req, res) => {
	console.log('Get All Services')
	
	try{
		const data = await getAllService();
		return res.send(sendResponse(200,data))
	}
	catch(err){
		console.log(err);
		return res.send(sendResponse(ERROR_STATUS_CODES[err.message] ?? 500,err.message ?? "Internal Server Error"))
		
	}
});

app.listen(port, function () {
	console.log(`listening on port ${port}!`);
});