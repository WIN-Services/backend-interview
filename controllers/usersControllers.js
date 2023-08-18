const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const HttpError = require('../models/httpError')
const { User } = require('../models/index');

const getAllUsers = async (req, res, next) => {
    try {
        const allUsers = await User.findAll({attributes: { exclude : ["password"]}});
        return res.status(200).json({ users: allUsers });
    } catch (e) {
        return next(new HttpError("Something went wrong! while fetching users", 500));
    }
}

const signup = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new HttpError('Invalid Inputs, Please check again!!', 422));
    }

    const { email, name, password } = req.body;

    // Throwing error if user already exists in database.
    let existingUser;
    try {
        existingUser = await User.findOne({ where: { email: email }});
    } catch (e) {
        return next(new HttpError('Couldnt Signup. Try Again', 500));
    }
    if (!!existingUser) {
        return next(new HttpError('Email allready exists!!', 422));
    }

    // Hashing the input password
    let hashedPassword;
    try {
        hashedPassword = await bcrypt.hash(password, 12);
    } catch (e) {
        return next(new HttpError('Could not save your credentials. Try again later', 500));
    }

    // Creating User and saving it to the database.
    const newUser = User.build({
        name: name,
        email: email,
        password: hashedPassword
    });
    try {
        await newUser.save();
    } catch (e) {
        return next(new HttpError('Could not save your credentials. Try again', 500));
    }

    // Creating auth token for the user
    let token;
    try {
        token = jwt.sign({ userId: newUser.id, email: email }, process.env.JWT_SECRET, { expiresIn: process.env.TOKEN_LIFE_TIME });
    } catch (e) {
        return next(new HttpError('Signing Up failed. try again later', 500));
    }

    newUser.password = undefined;
    res.status(201).json({ user: newUser, token: token });
}

const login = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new HttpError('Invalid Inputs, Please check again!!', 422));
    }

    const { email, password } = req.body;

    // Looking for the user with given email in the database.
    let existingUser;
    try {
        existingUser = await User.findOne({ where: { email: email } });
    } catch (e) {
        return next(new HttpError('Couldnt find your email. Try Again !!', 500));
    }
    if (!existingUser) {
        return next(new HttpError('Email hasnt been registered!!', 403));
    }

    // Validating the provided password with the user details from database.
    let isValidPassword = false;
    try {
        isValidPassword = await bcrypt.compare(password, existingUser.password);
    } catch (e) {
        return next(new HttpError('Couldnt log you in. Please try again.', 500));
    }

    if (!isValidPassword) {
        return next(new HttpError('Email or Password is wrong!!!!', 403));
    }

    // Generating fresh new auth token for user.
    let token;
    try {
        token = jwt.sign({ userId: existingUser.id, email: email }, process.env.JWT_SECRET, { expiresIn: process.env.TOKEN_LIFE_TIME });
    } catch (e) {
        return next(new HttpError('login failed. try again later', 500));
    }

    existingUser.password = undefined;
    res.status(200).json({ user: existingUser[0], message: 'Login', token: token });

}

exports.signup = signup;
exports.login = login;
exports.getAllUsers = getAllUsers;