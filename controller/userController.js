const fs = require('fs/promises');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const sharp = require('sharp');

const ApiError = require('../utils/apiError');
const User = require('../models/userModel');
const factory = require('./handlerFactory');
const generateToken = require('../utils/generateToken');
const cloud = require('../utils/uploadImgCloudinary');

const { uploadSingleImage } = require('../middlewares/uploadImageMiddleware');

exports.uploadUsreImage = uploadSingleImage('profileImage');

// Image processing
exports.resizeImage = asyncHandler(async (req, file, next) => {
  const filename = `user-${Date.now()}.jpeg`;
  if (req.file) {
    await sharp(req.file.buffer)
      .resize(600, 600)
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(`uploads/users/${filename}`);
    const result = await cloud.uploadImage(
      `uploads/users/${filename}`,
      'users'
    );
    // save image into our db
    req.body.profileImg = result.url;
    // remove images from folder uploads
    await fs.unlink(`uploads/users/${filename}`);
  }

  next();
});

// @des Create user
// @route POST /users
// @access Private
exports.createUser = factory.createOne(User);

// @des Get list of Users
// @route GET /users
// @access Public
exports.getUsers = factory.getAll(User);

// @des Get specific user by Id
// @route GET /users/:id
// @access Public
exports.getUser = factory.getOne(User);

// @des Update specific user by Id
// @route UPDATE /users/:id
// @access Private

exports.updateUser = factory.updateOne(User);
// @des Delete specific user by Id
// @route DELETE /users/:id
// @access Private

exports.changeUserPassword = asyncHandler(async (req, res, next) => {
  const document = await User.findByIdAndUpdate(
    req.params.id,
    {
      password: await bcrypt.hash(req.body.password, 12),
      passwordChangedAt: Date.now(),
    },
    {
      new: true,
    }
  );
  if (!document) {
    return next(new ApiError(`No document for this id ${req.params.id}`, 404));
  }
  res.status(200).json({ data: document });
});
exports.deleteUser = factory.deleteOne(User);

// @des Get logged user data
// @route GET /users/getMe
// @access Public/Protect
exports.getLoggedUserData = asyncHandler(async (req, res, next) => {
  req.params.id = req.user._id;
  next();
});

// @desc    Update logged user password
// @route   PUT /users/updateMyPassword
// @access  Private/Protect
exports.updateLoggedUserPassword = asyncHandler(async (req, res, next) => {
  // 1) Update user password based user payload
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      password: await bcrypt.hash(req.body.password, 12),
      passwordChangedAt: Date.now(),
    },
    {
      new: true,
    }
  );

  // 2) Generate token
  const token = generateToken(user._id);
  res.status(200).json({ data: user, token });
});

// @desc    Update logged user data (without password, role)
// @route   PUT /api/v1/users/updateMe
// @access  Private/Protect
exports.updateLoggedUserData = asyncHandler(async (req, res, next) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.user._id,
    {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      profileImg: req.body.profileImg,
    },
    { new: true }
  );

  res.status(200).json({ data: updatedUser });
});

// @desc    Deactivate logged user
// @route   DELETE /api/v1/users/deleteMe
// @access  Private/Protect
exports.deleteLoggedUserData = asyncHandler(async (req, res, next) => {
  console.log(req.user);
  await User.findByIdAndUpdate(req.user._id, { active: false });

  res.status(204).json({ status: 'Success' });
});
