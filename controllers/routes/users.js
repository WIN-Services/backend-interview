/**
 * Third party library
 */
const ObjectId = require('mongoose').Types.ObjectId;

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

/**
 * Removes existing user.
 * @param {Object} req Express request object
 * @param {Object} res Express response object
 * @returns
 */
const removeUser = async (req, res) => {
    const { userId } = req.body
    const resp = await users.deleteOne({ _id: ObjectId(userId) })
    return sendResponse(res, 200, resp, `User ${userId} removed.`)
}

module.exports = {
    addUser,
    removeUser
}