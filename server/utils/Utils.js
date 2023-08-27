const _ = require('lodash');

const Utils = {
    successResponse(res, json, opts = {}) {
        const { statusCode = 200 } = opts;
        res.status(statusCode).json({
            code: 200,
            message: undefined,
            result: json,
        });
    }
};

module.exports = Utils;

