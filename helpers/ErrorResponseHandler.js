import { constants } from '../helpers/Constants.js';
const { NOT_FOUND, INTERNAL_SERVER, INVALID, UNAUTHORIZED } = constants.HTTP_STATUS

export function ErrorResponse(res, error) {
	const data = {
		status: 'FAILED',
		message: extractError(error),
	};

	return res.status(INTERNAL_SERVER).json(data);
}

export function notFoundResponse(res, error) {
	const data = {
		status: 'FAILED',
		message: extractError(error),
	};

	return res.status(NOT_FOUND).json(data);
}

export function validationError(res, error, data) {
	const resData = {
		status: 'FAILED',
		message: extractError(error),
		data
	};

	return res.status(INVALID).json(resData);
}

export function unauthorizedResponse(res, error) {
	const data = {
		status: 'FAILED',
		message: extractError(error),
	};

	return res.status(UNAUTHORIZED).json(data);
}

function extractError(error) {

	if (typeof error == 'object') {
		return error.message
	} else if (typeof error == 'string') {
		return error
	} else return error
}
