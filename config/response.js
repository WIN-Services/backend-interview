const moment = require('moment');

const response = (status, message, data, res) => {
    let jsonData = {
        status: status,
        timestamp: moment().format('YYYY-MM-DD HH:mm:ss.ssss'),
        message: message,
        data:data
    };
    console.log("response Data",JSON.stringify(jsonData));
    return res.status(status).json(jsonData);
}

module.exports = {
    response
}