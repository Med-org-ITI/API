const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

exports.getUserValidator = [
  check("id").isMongoId().withMessage("Invalid user Id format"),
  validatorMiddleware,
];

exports.createUserValidator = [
  check("name")
    .notEmpty()
    .withMessage("User must be required")
    .isLength({ min: 3 })
    .withMessage("name must be more than 3 character")
    .isLength({ max: 32 })
    .withMessage("name must be less than 32 character"),
  validatorMiddleware,
];

exports.updateUserValidator = [
  check("id").isMongoId().withMessage("Invalid user Id format"),
  validatorMiddleware,
];

exports.deleteUserValidator = [
  check("id").isMongoId().withMessage("Invalid user Id format"),
  validatorMiddleware,
];
