const asyncHandler = require("express-async-handler");
const { default: slugify } = require("slugify");
const ApiError = require("../utlis/apiError");
const User = require("../modles/userModel");

// @des Create user
// @route POST /api/iti/users
// @access Private
exports.createUser = asyncHandler(async (req, res, next) => {
  const { name } = req.body;
  const user = await User.create({ name, slug: slugify(name) });
  res.status(201).json({ data: user });
});

// @des Get list of Users
// @route GET /api/iti/users
// @access Public
exports.getUsers = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 8;
  const skip = (page - 1) * limit;

  const users = await User.find({}).skip(skip).limit(limit);
  res.status(200).json({
    result: users.length,
    page,
    data: users,
  });
});

// @des Get specific user by Id
// @route GET /api/iti/users/:id
// @access Public
exports.getUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    return next(new ApiError(`No user for this id ${id}`, 404));
  }
  res.status(200).json({ data: user });
});

// @des Update specific user by Id
// @route UPDATE /api/iti/users/:id
// @access Private
exports.updateUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  const user = await User.findByIdAndUpdate(
    { _id: id },
    { name, slug: slugify(name) },
    { new: true }
  );
  if (!user) {
    return next(new ApiError(`No user for this id ${id}`, 404));
  }
  res.status(200).json({ data: user });
});

// @des Delete specific user by Id
// @route DELETE /api/iti/users/:id
// @access Private
exports.deleteUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findByIdAndDelete(id);
  if (!user) {
    return next(new ApiError(`No user for this id ${id}`, 404));
  }
  res.status(204).json();
});
