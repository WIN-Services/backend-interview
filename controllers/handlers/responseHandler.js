/**
 * Wrapper function for sending response back to client
 * @param {object} res The response object
 * @param {number} statusCode A valid status code
 * @param {object} data The data to be sent
 * @param {string} message The message
 * @returns response object
 */

const sendResponse = (res, statusCode, data = {}, message) => {
    try {
        const lengthPattern = /^[0-9]{3}$/ // regex pattern to validate that the status code is always 3 digits in length
        if (typeof statusCode !== 'number') throw new Error('statusCode should be a number')
        if (!lengthPattern.test(statusCode)) throw new Error('Invalid Status Code')

        let status = null
        const pattern = /^(2|3)\d{2}$/ // regex to test that status code start with 2 or 3 and should me 3 digits in length
        // if the status code starts with 2, set status variable as success
        pattern.test(statusCode) ? (status = 'success') : (status = 'failed')

        res.status(statusCode).json({
            status,
            data: data,
            message: message
        })

        return res
    } catch (err) {
        console.log(err)
        res.status(500).json({
            status: 'failed',
            data: {},
            message: 'Error while sending response!'
        })
    }
}

module.exports = {
    sendResponse
}