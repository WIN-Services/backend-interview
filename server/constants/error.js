const ERRORS = {
  // COMMON
  DOC_NOTFOUND: {statusCode: 404, code: 'DOC_NOTFOUND', message: '<name> not found for id : <id>'},
  DOC_PREEXIST: {statusCode: 400, code: 'DOC_PREEXIST', message: '<name> with id: <id> already exist in DB'},
  BAD_REQUEST: {statusCode: 400, code: 400, message: 'Bad request'},
  PARAM_REQUIRED: {statusCode: 400, code: 'PARAM_REQUIRED', message: '<name> is required.'},
  INVALID_PARAMS: {statusCode: 400, code: 'INVALID_PARAMS', message: 'Invalid <name> params'},
  INVALID_PARAMS_WITH_REASON: {statusCode: 400, code: 'INVALID_PARAMS', message: 'Invalid param <info>'},
  UNKNOWN_ERROR: {statusCode: 500, code: 'UNKNOWN_ERROR', message: 'An error occurred please try after sometime'},
  // MISC
  MONGO_NOT_CONNECTED: {statusCode: 500, code: 'MONGO_NOT_CONNECTED', message: 'Mongo not connected'},
  // Order
  ORDER_RECENTLY_UPDATED: {statusCode: 400, code: 'ORDER_RECENTLY_UPDATED', message: 'Cannot update order, please try after <time> min'},
};

module.exports = ERRORS;
