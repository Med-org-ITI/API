const asyncHandler = require('express-async-handler');
const Cart = require('../models/cartModel');
const Order = require('../models/orderModel');
const ApiError = require('../utils/apiError');

exports.allOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find();
  res.status(200).json({ message: 'all orders', orders });
});

exports.getOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.orderId);
  res.status(200).json({ message: 'got the order', order });
});

// HERE  User
exports.userOrders = asyncHandler(async (req, res, next) => {

	// if (req.user._id !== req.params.id) {
	// 	return next(new ApiError('You are not allowed to get this information', 401));
	// }
	const orders = await Order.find({ userId: req.user._id });
	res.status(200).json({ message: 'got user orders', data: orders });
});

exports.userCompletedOrders = asyncHandler(async (req, res, next) => {
  if (req.user._id !== req.params.id) {
    return next(
      new ApiError(401, 'You are not allowed to get this information')
    );
  }
  const orders = await Order.find({
    status: 'completed',
    userId: req.params.id,
  });
  res.status(200).json({ message: 'got user completed orders', orders });
});


exports.createOrder = asyncHandler(async (req, res, next) => {
	const cart = await Cart.findOne({ userId: req.user._id });
	if (cart.items.length <= 0) {
		return next(new ApiError('cart must be filled with items', 422));
	}
	const order = new Order({ total: cart.total, items: cart.items, userId: cart.userId });
	cart.items = [];
	cart.total = 0;
	await cart.save();
	await order.save();
	res.status(203).json();

});
