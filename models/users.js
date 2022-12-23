const CONFIG = require('../config/config').DB
const mongooseConnection = CONFIG.MONGOOSE_CONN_OBJECT

const mongoose = CONFIG.MONGOOSE_CONN
const { Schema } = mongoose

const usersSchema = new Schema(
    {
        name: { type: String },
        email: { type: String },
        contact: { type: String },
        verificationStatus: { type: Boolean, default: false }
    },
    {
        timestamps: true
    }
)

const user = mongooseConnection.model('user', usersSchema, 'user')
module.exports = user