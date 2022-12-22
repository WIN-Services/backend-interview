/**
 * Internal helper functions
 */
const { sendResponse } = require('../handlers/responseHandler')

/**
 * Database models
 */
const users = require('../../models/users')

/**
 * Adds new user.
 * @param {Object} req Express request object
 * @param {Object} res Express response object
 * @returns
 */
const addUser = async (req, res) => {
    const { name, email, contact, verificationStatus } = req.body
    const resp = await users.create({ name, email, verificationStatus, contact })
    return sendResponse(res, 200, resp, 'User created.')
}

module.exports = {
    addUser
}