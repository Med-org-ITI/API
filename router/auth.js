const express = require('express');
const { signup, login, updateUser } = require('../controller/auth');

const { uploadSingleImage } = require('../middlewares/uploadImageMiddleware');
const { signupValidator, loginValidator } = require('../utils/validators/authValidator');
const authorizeUser = require('../middlewares/authorizeUserMiddleware');
const { uploadUserImage, resizeImage } = require('../services/userService');

const router = express.Router();

router.post('/signup', uploadUserImage, resizeImage, signupValidator, signup);

router.post('/login', loginValidator, login);

router.patch('/:id', authorizeUser, updateUser);
module.exports = router;