/**
 * Internal helper functions
 */
const { sendResponse } = require("./responseHandler")


/**
 * try-catch internal callback function
 * @param {Function} func the actual function you want to call
 */
const tryCatchCallback = async (req, res, next, func) => {
    try {
        if (typeof func !== 'function') {
            throw new Error(`${func} is not a function!!`)
        }
        return func(req, res, next)
    } catch (err) {
        throw new Error(err)
    }
}

/**
 * Try Catch wrapper function for all the Express callback functions.
 ** This removes the adhoc use of try and catch in all the function.
 * @param {Function} func the actual function you want to call
 * @returns Promise
 ** In case of error, 500 response is sent back
 */
const tryCatchHandler = func => (req, res, next) => Promise.resolve(tryCatchCallback(req, res, next, func)).catch((err) => {
    console.log('\n\n\n***** Try Catch Handler start >> *****\n')
    console.log(err)
    console.log('\n***** Try Catch Handler end << *****\n\n\n')
    return sendResponse(res, 500, {}, 'Something went wrong!')
})

module.exports = {
    tryCatchHandler
}