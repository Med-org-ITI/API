const User = require('../models/userModel');
const factory = require('./handlerFactory');

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
