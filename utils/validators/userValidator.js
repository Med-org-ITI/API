const { check, body } = require('express-validator');
const { default: slugify } = require('slugify');
const bcrypt = require('bcryptjs');
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
  check('id').isMongoId().withMessage('Invalid User id format'),
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

exports.changeUserPasswordValidator = [
  check('id').isMongoId().withMessage('Invalid User id format'),
  body('currentPassword')
    .notEmpty()
    .withMessage('You must enter your current password'),
  body('passwordConfirm')
    .notEmpty()
    .withMessage('You must enter the password confirm'),
  check('password')
    .notEmpty()
    .withMessage('You must enter new password')
    .custom(async (val, { req }) => {
      // 1) Verfiy current password
      const user = await User.findById({ _id: req.params.id });
      if (!user) {
        throw new Error('There is no user for this id');
      }
      const isCorrectPassword = await bcrypt.compare(
        req.body.currentPassword,
        user.password
      );
      if (!isCorrectPassword) {
        throw new Error('Incorrect current password');
      }

      //2) Verfiy password confirm
      if (val !== req.body.passwordConfirm) {
        throw new Error('Password Confirmation incorrect');
      }
      return true;
    }),
  validatorMiddleware,
];

exports.updateLoggedUserPasswordValidator = [
  body('currentPassword')
    .notEmpty()
    .withMessage('You must enter your current password'),
  body('passwordConfirm')
    .notEmpty()
    .withMessage('You must enter the password confirm'),
  check('password')
    .notEmpty()
    .withMessage('You must enter new password')
    .custom(async (val, { req }) => {
      // 1) Verfiy current password
      const isCorrectPassword = await bcrypt.compare(
        req.body.currentPassword,
        req.user.password
      );
      if (!isCorrectPassword) {
        throw new Error('Incorrect current password');
      }

      //2) Verfiy password confirm
      if (val !== req.body.passwordConfirm) {
        throw new Error('Password Confirmation incorrect');
      }
      return true;
    }),
  validatorMiddleware,
];

exports.updateLoggedUserDataValidator = [
  body('name')
    .optional()
    .isLength({ min: 3 })
    .withMessage('Too short name')
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  check('email')
    .optional()
    .isEmail()
    .withMessage('Invalid email address')
    .custom(async (val) => {
      const user = await User.findOne({ email: val });
      if (user) {
        throw new Error('E-mail already in used');
      }
      return true;
    }),

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
    ]),
  body('profileImg').optional(),

  validatorMiddleware,
];
