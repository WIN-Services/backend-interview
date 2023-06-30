const { constants } =require('../utils/Constants.js');
const { SUCCESS } = constants.HTTP_STATUS

 function successResponse(res, msg ,data) {
	const response = {
		status: 'SUCCESS',
		msg,
		data
	};

	return res.status(SUCCESS).json(response);
}
module.exports={
	successResponse
}