const createHttpError = require('http-errors')
//* Include joi to check error type 
const Joi = require('joi')
//* Include all validators
const Validators = require('./index')

module.exports = function (validator) {
    //! If validator is not exist, throw err
    if (!Validators.hasOwnProperty(validator))
        throw new Error(`'${validator}' validator is not exist`)

    return async function (req, res, next) {
        try {
            const result = Validators[validator].validate(req.body);
            console.log(result)
            const { value, error } = result;
            const valid = error == null;
            if (!valid) {
                return res.status(422).json({
                    message: 'Invalid request',
                    data: error.details
                })
            }
            next()
        } catch (err) {
            if (err.isJoi)
                return next(createHttpError(422, { message: err.message }))
            next(createHttpError(500))
        }
    }
}
