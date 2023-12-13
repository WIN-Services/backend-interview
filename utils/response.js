function sendResponse(statusCode,message){
	return {
		statusCode,
		message
	}
}
module.exports = { sendResponse }