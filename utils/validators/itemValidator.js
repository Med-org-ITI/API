const { check } = require('express-validator');
const { default: slugify } = require('slugify');

const validatorMiddleware = require('../../middlewares/validatorMiddleware');
const User = require('../../models/userModel');

exports.getItemValidator = [
  check('id').isMongoId().withMessage('Invalid Item Id format'),
  validatorMiddleware,
];

// continue from Item model
exports.createItemValidator = [
  check('title')
    .notEmpty()
    .withMessage('Item title must be required')
    .isLength({ min: 3 })
    .withMessage('title item must be more than 3 character')
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  check('description')
    .notEmpty()
    .withMessage('Item description must be required')
    .optional()
    .isLength({ min: 20 }),
  check('price')
    .notEmpty()
    .withMessage('Item price must be required')
    .isNumeric()
    .withMessage('Item price must be Number'),
  // expiryDate > currentDate
  check('expiryDate')
    .notEmpty()
    .withMessage('Item expiryDate must be required')
    .isDate()
    .withMessage('Item expiryDate must be Date'),
  check('quantity')
    .optional()
    .isNumeric()
    .withMessage('Item price must be Number'),
  check('userId')
    .notEmpty()
    .withMessage('tem must be belong to user')
    .isMongoId()
    .withMessage('Invalid  userId format')
    .custom((userId) =>
      User.find({ _id: { $exists: true, $in: userId } }).then((user) => {
        if (!user) {
          return Promise.reject(new Error(`No user for this id: ${userId}`));
        }
      })
    ),
  validatorMiddleware,
];

exports.updateItemValidator = [
  check('title')
    .optional()
    .isLength({ min: 3 })
    .withMessage('title item must be more than 3 character')
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  check('description').optional().isLength({ min: 20 }),
  check('price')
    .optional()
    .isNumeric()
    .withMessage('Item price must be Number'),
  check('expiryDate')
    .optional()
    .isDate()
    .withMessage('Item expiryDate must be Date'),
  // expiryDate > currentDate
  check('quantity')
    .optional()
    .isNumeric()
    .withMessage('Item price must be Number'),
  check('userId')
    .optional()
    .isMongoId()
    .withMessage('Invalid  userId format')
    .custom((userId) =>
      User.find({ _id: { $exists: true, $in: userId } }).then((user) => {
        if (!user) {
          return Promise.reject(new Error(`No user for this id: ${userId}`));
        }
      })
    ),
  validatorMiddleware,
];

exports.deleteItemValidator = [
  check('id').isMongoId().withMessage('Invalid Item Id format'),
  validatorMiddleware,
];
