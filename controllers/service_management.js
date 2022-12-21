const service = require("../model/service");

const addService = (req, res) => {
	//add a new service into system, if a service namealready exist with the name then update it.
	try{
		let reqBody = req.body;
		console.log("Request Recieved:", reqBody)
		if ( 'serviceName' in reqBody && 'team' in reqBody){
			let queryObj = {
				'serviceName': reqBody['serviceName']
			}
			let updateObj = {
				'serviceName': reqBody['serviceName'],
				'team': reqBody['team']
			}
			let options = {
				new: true,
				upsert: true
			}
			service.findOneAndUpdate( queryObj, updateObj, options).then( doc => {
				console.log(" Service successfully added in the system", doc)
				return res.status(200).json({status: 0, message: "service added successfully!!!"})
			}).catch( err => {
				console.log("Error in saving service to db.", err)
				return res.status(400).json({status: 0, message: "Error in saving service into DB."})
			})
		} else {
			console.log(" Required parameter is missing in addService function.")
			return res.status(500).json({status: 0, message: "Required parameter is missing."})
		}
	} catch( err) {
		console.log("Error in adding service: ", err)
		return res.status(400).json({status: 0, message: "Error in adding service."})
	}
}

module.exports = {
	addService
}