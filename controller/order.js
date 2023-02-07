const customError = require('../customError');
const Cart = require('../models/cart');
const Order = require('../models/order');

exports.allOrders = async (req, res) => {
	try {
		const orders = await Order.find();
		res.status(200).json({ message: 'all orders', orders });
	} catch (err) {
		res.status(500).json(err);
	}
};

exports.getOrder = async (req, res) => {
	try {
		const order = await Order.findById(req.params.orderId);
		res.status(200).json({ message: 'got the order', order });
	} catch (err) {
		res.status(500).json(err);
	}
};

exports.userOrders = async (req, res) => {
	try {
		if (res.locals.userId !== req.params.id) {
			return next(customError(401, 'You are not allowed to get this information'));
		}
		const orders = await Order.find({ userId: req.params.id });
		res.status(200).json({ message: 'got user orders', orders });
	} catch (err) {
		res.status(500).json(err);
	}
};

exports.userCompletedOrders = async (req, res) => {
	try {
		if (res.locals.userId !== req.params.id) {
			return next(customError(401, 'You are not allowed to get this information'));
		}
		const orders = await Order.find({ status: 'completed', userId: req.params.id });
		res.status(200).json({ message: 'got user orders', orders });
	} catch (err) {
		res.status(500).json(err);
	}
};

exports.createOrder = async (req, res) => {
	try {
		const cart = await Cart.findOne({ userId: res.locals.userId });
		const order = new Order({ total: cart.total, items: cart.items, userId: cart.userId });
		cart.items = [];
		cart.total = 0;
		await cart.save();
		await order.save();
		res.status(201).json('order created');
	} catch (err) {
		res.status(500).json(err);
	}
};
