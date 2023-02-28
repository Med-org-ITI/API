const express = require('express');

const { signupUserValidator, loginUserValidator } = require('../utils/validators/authValidator');
const { uploadSingleImage } = require('../middlewares/uploadImageMiddleware');
const { signup, login, forgotPassword, verifyPassRestCode, resetPassword } = require('../controller/authController');

const router = express.Router();

router.route('/signup').post(uploadSingleImage('profileImage'), signupUserValidator, signup);
router.route('/login').post(loginUserValidator, login);
router.post('/forgotPassword', forgotPassword);
router.post('/verifyResetCode', verifyPassRestCode);
router.put('/resetPassword', resetPassword);

module.exports = router;
