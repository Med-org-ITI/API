const asyncHandler = require('express-async-handler');
const Cart = require('../models/cartModel');

exports.getCart = asyncHandler(async (req, res) => {
	let cart = await Cart.findOne({ userId: req.user._id }).populate('items.itemId');
	if (!cart) {
		cart = await Cart.create({ userId: req.user._id });
	}
	res.status(200).json({ data: cart });
});

exports.addToCart = asyncHandler(async (req, res) => {
	const { quantity, itemId, price } = req.body;
	let cart = await Cart.findOne({ userId: req.user._id });
	if (!cart) {
		cart = await Cart.create({ userId: req.user._id });
	}
	cart.total += price * quantity;
	const itemIndex = cart.items.findIndex(i => i.itemId === itemId);
	if (itemIndex > -1) {
		const existingItem = cart.items[itemIndex];
		existingItem.quantity += +quantity;
		cart.items[itemIndex] = existingItem;
	} else {
		cart.items.push({ itemId, price, quantity });
	}
	await cart.save();
	res.status(201).json({ data: cart });
});

exports.removeFromCart = asyncHandler(async (req, res) => {
	const { itemId, price } = req.body;
	const cart = await Cart.findOne({ userId: req.user._id });
	const itemIndex = cart.items.findIndex(i => i.itemId === itemId);
	const existingItem = cart.items[itemIndex];
	cart.total -= price;
	if (existingItem.quantity > 1) {
		existingItem.quantity -= 1;
		cart.items[itemIndex] = existingItem;
	} else {
		cart.items.splice(itemIndex, 1);
	}
	await cart.save();
	res.status(200).json({ data: cart });
});

exports.clearCart = asyncHandler(async (req, res) => {
	const cart = await Cart.findOne({ userId: req.user._id });
	cart.items = [];
	cart.total = 0;
	await cart.save();
	res.status(203).json('cart cleared');
});
