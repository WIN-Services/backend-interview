const validateCreateOrder = (req, res, next) => {
    const payload = req.body;
    let statusCode = 200, error = null, data = null;
    if(!payload.hasOwnProperty("totalfee")) {
        statusCode = 400;
        error = "totalfee field should be present";
    } else if(!payload.hasOwnProperty("services") || !Array.isArray(payload["services"]) || !payload["services"][0].hasOwnProperty("id")) {
        statusCode = 400;
        error = "services field should be present and it should be an array"
    }
    if(error) return res.status(statusCode).json({ error, data })
    next();
}

const validateUpdateOrder = (req, res, next) => {
    if(!req.body.hasOwnProperty("id")) {
        const response = {
            error: "id field should be present",
            data: null
        }
        return res.status(400).json(response)
    } 
    next();
}

const validateCreateService = (req, res, next) => {
    if(!req.body.hasOwnProperty("name")) {
        const response = {
            error: "name field should be present",
            data: null
        }
        return res.status(400).json(response)
    } 
    next();
}

module.exports = {
    validateCreateOrder,
    validateUpdateOrder,
    validateCreateService
}