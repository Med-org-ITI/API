const { check } = require('express-validator');
const { default: slugify } = require('slugify');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');
const User = require('../../models/userModel');

exports.getUserValidator = [
  check('id').isMongoId().withMessage('Invalid user Id format'),
  validatorMiddleware,
];

// continue from user model
exports.createUserValidator = [
  check('name')
    .notEmpty()
    .withMessage('User must be required')
    .isLength({ min: 3 })
    .withMessage('name must be more than 3 character')
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  check('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email')
    .custom(async (val) => {
      const user = await User.findOne({ email: val });
      if (user) {
        throw new Error('E-mail already in used');
      }
      return true;
    }),

  check('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters')
    .custom((password, { req }) => {
      if (password !== req.body.passwordConfirm) {
        throw new Error('Password Confirmation incorrect');
      }
      return true;
    }),

  check('passwordConfirm')
    .notEmpty()
    .withMessage('Password confirmation is required'),

  check('phone')
    .optional()
    .isMobilePhone([
      'am-AM',
      'ar-AE',
      'ar-BH',
      'ar-DZ',
      'ar-EG',
      'ar-IQ',
      'ar-JO',
      'ar-KW',
      'ar-LB',
      'ar-LY',
      'ar-MA',
      'ar-OM',
      'ar-PS',
      'ar-SA',
      'ar-SY',
      'ar-TN',
      'en-US',
    ])
    .withMessage('Invalid Phone Number'),

  check('profileImg').optional(),
  check('role').optional(),
  validatorMiddleware,
];

exports.updateUserValidator = [
  check('name')
    .optional()
    .isLength({ min: 3 })
    .withMessage('name must be more than 3 character')
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  check('email')
    .optional()
    .isEmail()
    .withMessage('Invalid email address')
    .custom(async (val) => {
      const user = await User.find({ email: val });
      if (user) {
        throw new Error('E-mail already in used');
      }
    }),

  check('password')
    .optional()
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),

  check('phone')
    .optional()
    .isMobilePhone([
      'am-AM',
      'ar-AE',
      'ar-BH',
      'ar-DZ',
      'ar-EG',
      'ar-IQ',
      'ar-JO',
      'ar-KW',
      'ar-LB',
      'ar-LY',
      'ar-MA',
      'ar-OM',
      'ar-PS',
      'ar-SA',
      'ar-SY',
      'ar-TN',
      'en-US',
    ])
    .withMessage('Invalid Phone Number'),

  check('profileImg').optional(),
  check('role').optional(),
  check('id').isMongoId().withMessage('Invalid user Id format'),
  validatorMiddleware,
];

exports.deleteUserValidator = [
  check('id').isMongoId().withMessage('Invalid user Id format'),
  validatorMiddleware,
];
