// for logging errors
function errorLogger(error, req, res, next) { 
    console.log("Error Handling Middleware called");
    console.log('Path: ', req.path);
    console.error('Error: ', error);
    next(error) // forward to next middleware
}

// responding to client
// we can change all errors to actually give the right status code with this capability
const knownErrorCodesToHttpCodesMapping = {
    100 : 400,
    101 : 400
};

const knownErrorCodesToUserMessages = {
};

function errorResponder(error, req, res, next) { 
    if(error.httpCode || knownErrorCodesToHttpCodesMapping[error.code]){
        res.status(error.httpCode || knownErrorCodesToHttpCodesMapping[error.code])
        res.json({
            status : 'failure',
            errorCode :  error.code || 'NA',
            errorMessage : knownErrorCodesToUserMessages[error.code] || error.message || 'NA',
            ...error.details && { details : error.details },
            ...req.query.debug && req.query.debug == 'true' && { errorStack : error.stack || 'NA' } 
        })
    }
    else   
        next(error) // forwarding exceptional case to fail-safe middleware
}

// generic error handler
function failSafeHandler(error, req, res,next) { // eslint-disable-line no-unused-vars  
    res.status(500).json({
        status : 'failure',
        errorCode : error.code || 'NA',
        errorMessage : error.message || 'NA',
        ...error.details && { details : error.details },
        ...req.query.debug && req.query.debug === 'true' && { errorStack : error.stack || 'NA' } 
    })
}

module.exports = {
    errorLogger,
    errorResponder,
    failSafeHandler
}