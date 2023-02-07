const express = require('express');
const { signup, login } = require('../controller/auth');
const userValidation = require('../userValidation');

const router = express.Router();

router.post('/signup', userValidation,signup);

router.post('/login', userValidation, login);

module.exports = router;