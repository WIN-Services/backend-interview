import { constants } from '../helpers/Constants.js';
const { SUCCESS } = constants.HTTP_STATUS

export function successResponse(res, data) {
	const response = {
		status: 'SUCCESS',
		data
	};

	return res.status(SUCCESS).json(response);
}
