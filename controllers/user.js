const { verifyTokenAndAuthenticate } = require('./verifyToken')
const { User: UserService } = require('../services')
const { patch: patchSchema, getById: getByIdSchema } = require('../dto-schemas/user')
const Validator = require('../utils/validator')

const patch = async (req, res) => {
    try {
        const { user, body: { username, password } } = req;

        const data = { username, password, ...user }

        const { errors: validateErrors, data: validData } = Validator.isSchemaValid({ data, schema: patchSchema })

        if (validateErrors) {
            res.status(400).json(validateErrors);
        }

        const { errors, doc } = await UserService.patch(validData);

        if (errors) {
            res.status(404).json(errors);
        }

        res.status(201).json(doc)
    }
    catch (error) {
        res.status(500).json({ errors: error })
    }
}

const remove = async (req, res) => {
    try {
        const { params: { id } } = req;

        const { errors: validateErrors, data: validData } = Validator.isSchemaValid({ data: { id }, schema: getByIdSchema })

        if (validateErrors) {
            res.status(400).json(validateErrors);
        }

        const { errors, doc } = await UserService.remove(validData);

        if (errors) {
            res.status(404).json(errors);
        }

        res.status(200).json(doc)
    }
    catch (error) {
        res.status(500).json({ errors: error })
    }

}

const getById = async (req, res) => {
    try {
        const { params: { id } } = req;

        const { errors: validateErrors, data: validData } = Validator.isSchemaValid({ data: { id }, schema: getByIdSchema })

        if (validateErrors) {
            res.status(400).json(validateErrors);
        }

        const { errors, doc } = await UserService.getById(validData);

        if (errors) {
            res.status(404).json(errors);
        }

        res.status(200).json(doc)
    }
    catch (error) {
        res.status(500).json({ errors: error })
    }
}

const get = async (req, res) => {
    try {
        const { query: { pageSize, pageNumber } } = req;

        const limit = pageSize || 10;

        const offset = limit * ((parseInt(pageNumber) || 1) - 1);

        const { errors, doc } = await UserService.get({limit, offset});

        if (errors) {
            res.status(404).json(errors);
        }

        res.status(200).json(doc)
    }
    catch (error) {
        res.status(500).json({ errors: error })
    }
}

const getStats = async (req, res) => {
    try {
        const { errors, doc } = await UserService.getStats();

        if (errors) {
            res.status(404).json(errors);
        }

        res.status(200).json(doc)
    }
    catch (error) {
        res.status(500).json({ errors: error })
    }
}

module.exports = {
    patch,
    remove,
    getById,
    get,
    getStats,
}