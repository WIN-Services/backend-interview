const CONFIG = require('../config/config').DB
const mongooseConnection = CONFIG.MONGOOSE_CONN_OBJECT

const mongoose = CONFIG.MONGOOSE_CONN
const { Schema } = mongoose

const testSchema = new Schema(
    {
        string: { type: String, required: true },
        number: { type: Number },
        object: { type: Object },
        array: { type: Array },
        boolean: { type: Boolean },
        date: { type: Date },
    },
    {
        timestamps: true
    }
)

const test = mongooseConnection.model('test', testSchema, 'test')
module.exports = test