const sharp = require('sharp');
const { v4: uuidv4 } = require('uuid');
const asyncHandler = require('express-async-handler');

const User = require('../models/userModel');
const factory = require('./handlerFactory');

const { uploadSingleImage } = require('../middlewares/uploadImageMiddleware');

exports.uploadUsreImage = uploadSingleImage('image');

// Image processing
exports.resizeImage = asyncHandler(async (req, file, next) => {
  const filename = `user-${uuidv4()}-${Date.now()}.jpeg`;

  if (req.file) {
    await sharp(req.file.buffer)
      .resize(600, 600)
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(`uploads/users/${filename}`);
  }

  // save image into our db
  req.body.image = filename;
  next();
});

// @des Create user
// @route POST /api/iti/users
// @access Private
exports.createUser = factory.createOne(User);

// @des Get list of Users
// @route GET /api/iti/users
// @access Public
exports.getUsers = factory.getAll(User);

// @des Get specific user by Id
// @route GET /api/iti/users/:id
// @access Public
exports.getUser = factory.getOne(User);

// @des Update specific user by Id
// @route UPDATE /api/iti/users/:id
// @access Private

exports.updateUser = factory.updateOne(User);
// @des Delete specific user by Id
// @route DELETE /api/iti/users/:id
// @access Private
exports.deleteUser = factory.deleteOne(User);
