const moment = require('moment');

const datetimeFormat = 'YYYY-MM-DD HH:mm:ss'; // format to validate against

function validateOrderVO(req, res, next){
    console.log('validatin order valueObject body:', req.body);

    let status = 'Failure', message, data = null;
    const { total = undefined, datetime = undefined, services = undefined } = req.body;

    if(total == undefined){
        message = 'Error! total field is not present';
        return res.status(400).send({status, message, data})
    }else if(!Number.isInteger(total)){
        message = 'Invalid type! total field must be integer';
        return res.status(400).send({status, message, data})
    }

    if(services == undefined){
        message = 'Error! services field is not present';
        return res.status(400).send({status, message, data})
    }else if(!(typeof services == 'string' && services.trim().length > 0)){
        message = 'Invalid type! services field must be string';
        return res.status(400).send({status, message, data})
    }
    
    if(datetime == undefined){
        message = 'Error! datetime field is not present';
        return res.status(400).send({status, message, data})
    }else if(!(typeof datetime == 'string' && moment(datetime, datetimeFormat, true).isValid())){
        message = `Invalid datetime format! Datetime format must follow ${datetimeFormat} format`;
        return res.status(400).send({status, message, data})
    }

    next();
}

module.exports = {
    validateOrderVO
}