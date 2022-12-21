const mongoose = require('mongoose');
const serviceSchema = new mongoose.Schema({
	serviceName : {
		type : String,
		required : true
	},
	team: {
		type: String,
		required: true
	}
},
{ timestamps : true }
);

const service = mongoose.model('service',serviceSchema);
module.exports = service;