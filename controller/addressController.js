const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

// @des Add address to to user addresses
// @route POST /addresses
// @access Protect/User
exports.addAddress = asyncHandler(async (req, res, next) => {
  // $addToSet => add addressId to object to user addresses array if address not exist
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $addToSet: { addresses: req.body },
    },
    { new: true }
  );
  res.status(200).json({
    status: 'success',
    message: 'Address added successfully.',
    data: user.addresses,
  });
});

// @des Remove address from user addresses
// @route DELETE /addresses/:addressId
// @access Protect/User
exports.removeAddrees = asyncHandler(async (req, res, next) => {
  // $addToSet => add productId to wishlist array if productId not exist
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $pull: { addresses: { _id: req.params.addressId } },
    },
    { new: true }
  );
  res.status(204).json({
    status: 'success',
    message: 'Address removed successfully.',
    data: user.addresses,
  });
});

// @des Get Logged user addresses
// @route GET /addresses
// @access Protect/User
exports.getLoggedUserAddresses = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id).populate('addresses');
  res.status(200).json({
    status: 'success',
    result: user.addresses.length,
    data: user.addresses,
  });
});
