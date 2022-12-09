const { register: registerSchema, login: loginSchema } = require('../dto-schemas/auth')
const { Auth: AuthService } = require('../services')
const Validator = require('../utils/validator')

const register = async (req, res) => {
    try {
        const { body } = req;

        const { errors: validateErrors, data: validData } = Validator.isSchemaValid({ data: body, schema: registerSchema })

        if (validateErrors) {
            res.status(400).json(validateErrors);
        }

        const { errors, doc } = await AuthService.register(validData);
        
        if(errors){
            res.status(404).json(errors);
        }

        res.status(201).json(doc)
    } catch (error) {
        res.status(500).json({ errors: error })
    }
}

const login = async(req, res) => {
    try {
        const { body } = req;

        const { errors: validateErrors, data: validData } = Validator.isSchemaValid({ data: body, schema: loginSchema })

        if (validateErrors) {
            res.status(400).json(validateErrors);
        }

        const { errors, doc } = await AuthService.login(validData);
        
        if(errors){
            res.status(404).json(errors);
        }

        res.status(201).json(doc)
    } catch (error) {
        res.status(500).json({ errors: error })
    }
}

module.exports = {
    register,
    login
}