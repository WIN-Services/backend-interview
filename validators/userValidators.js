const { body } = require("express-validator");

const signUpValidator = [
    body('name', "Name is required").not().isEmpty(),
    body('email', "Email is required").normalizeEmail().isEmail(),
    body('password', "Password must be valid. (min 5)").isLength({ min: 5 })
]

const loginInValidator = [
    body('email', "Email is required").normalizeEmail().isEmail(),
    body('password', "Password must be valid. (min 5)").isLength({ min: 5 })
]

exports.signUpValidator = signUpValidator;
exports.loginInValidator = loginInValidator;