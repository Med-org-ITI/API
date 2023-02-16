const express = require('express');

const { signup, login } = require('../controller/authController');
const { uploadSingleImage } = require('../middlewares/uploadImageMiddleware');
const {
  signupValidator,
  loginValidator,
} = require('../utils/validators/authValidator');
const authorizeUser = require('../middlewares/is-auth');

const router = express.Router();

router.post(
  '/signup',
  uploadSingleImage('profileImage'),
  signupValidator,
  signup
);
router.post('/login', loginValidator, login);

module.exports = router;
