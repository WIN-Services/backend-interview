const {createServiceSchema} = require("../utils/joiSchema");


function validateCreateService(req, res, next) {
    const { error } = createServiceSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
}

module.exports = validateCreateService;