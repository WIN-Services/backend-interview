const { sendResponse } = require('../handlers/responseHandler')
const test = require('../../models/sample')

async function testInsertion(req, res) {
    const resp = await test.create({ string: "This is sample document" })
    return sendResponse(res, 200, { resp }, 'Ok')
}

module.exports = {
    testInsertion
}