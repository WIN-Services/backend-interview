const APP_CONSTANTS = {
  SERVICE: {
    ERRORS: Object.freeze({
      INVALID: 'Invalid service.',
      CREATE: 'Unable to create service.',
      GET: 'Unable to get service(s)',
      REQUIRED_PARAM_MISSING: 'Name is required',
      ALREADY_EXISTS: 'Service with same name already exists.'
    })
  },
  ORDER: {
    ERRORS: Object.freeze({
      INVALID: 'Invalid Order.',
      CREATE: 'Unable to create order.',
      GET: 'Unable to get order(s)',
      ALREADY_EXISTS: 'An order already exists within 3 hours of the specified time.',
      INVALID_SERVICE: 'Invalid Service',
      MISSING_ID: 'Order Id is missing',
      REQUIRED_PARAM_MISSING: "Total Fee or Service is required",
    })
  },
  ERRORS: Object.freeze({
    NOT_FOUND: 'Not found.',
    SOMETHING_WENT_WRONG: 'Something went wrong.'
  }),
  STATUS: Object.freeze({
    SUCCESS: 'SUCCESS',
    FAILURE: 'FAILURE'
  })
};

module.exports = Object.freeze(APP_CONSTANTS);
