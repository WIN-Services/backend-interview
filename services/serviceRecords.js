let Record = require("../models/serviceRecords");

async function getServiceRecordsByNames(nameArray) {
    return Record.find({ name: { $in: nameArray } }, { _id: 1 })
}

module.exports = {getServiceRecordsByNames}