const MISSING_REQUIRED_FIELDS = "Missing_Required_Fields"
const INVALID_SERVICE_ID = "Invalid_Service_ID"
const INVALID_ORDER_ID = "Order_Id_Not_Found"
const DB_FAILED_TO_CONNECT = "DB_Failed_To_Connect"
const TIME_CREATION_ERROR = "Service_Creation_Need_3HRS"

const ERROR_STATUS_CODES = {
	Missing_Required_Fields:400,
	Invalid_Service_ID:400,
	Order_Id_Not_Found:404,
	DB_FAILED_TO_CONNECT: 503,
	Service_Creation_Need_3HRS:400
}

module.exports = {
	MISSING_REQUIRED_FIELDS,
	ERROR_STATUS_CODES,
	INVALID_SERVICE_ID,
	INVALID_ORDER_ID,
	DB_FAILED_TO_CONNECT,
	TIME_CREATION_ERROR
}