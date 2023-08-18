const express = require('express');
const { check } = require('express-validator');
const { getAllUsers, signup, login} = require('../controllers/usersControllers');
const { signUpValidator, loginInValidator } = require('../validators/userValidators');

const router = express.Router();

router.get('/all', getAllUsers)

router.post('/signup', signUpValidator, signup);

router.post('/login', loginInValidator, login);


module.exports = router;