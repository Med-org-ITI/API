const { check } = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');

exports.signupValidator = [
  check('username')
    .notEmpty()
    .withMessage('Username is required')
    .isLength({ min: 3 })
    .withMessage('name must be more than 2 characters')
    .isLength({ max: 32 })
    .withMessage('name must be less than 33 characters'),

  check('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid Email address'),

  check('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters'),

  check('addresss').optional(),

  check('profileImage').optional(),

  validatorMiddleware,
];

exports.loginValidator = [
  check('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid Email address'),

  check('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters'),

  validatorMiddleware,
];
