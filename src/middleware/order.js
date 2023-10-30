
export const validateIdParam = (req, res, next) => {
    if (!req.params.id) {
        return res.status(400).json({ error: 'ID parameter is missing' });
    }

    next();
};

export const validateCreateOrder = async (req, res, next) => {
    const { id, datetime, totalfee, services } = req.body;

    if (!id || !datetime || !totalfee || !services) {
        return res.status(400).json({ error: 'Invalid order parameters' });
    }

    next();
};

export const validateCreateService = async (req, res, next) => {
    const { id, name } = req.body;

    if (!id || !name) {
        return res.status(400).json({ error: "Both 'id' and 'name' are required." });
    }

    next();
};