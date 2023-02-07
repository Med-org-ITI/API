const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const customError = require('../customError');
const User = require('../models/user');
const Cart = require('../models/cart');

exports.login = async (req, res) => {
	try {
		const { username, password } = req.body;
		const user = await User.findOne({ username });
		if (!user) {
			return next(customError(422, 'invalid email or password!'));
		}
		const isValid = await bcrypt.compare(password, user.password);
		if (!isValid) {
			return next(customError(422, 'invalid email or password!'));
		}
		const { _id: id } = user;
		const token = jwt.sign({ id }, 'Secret');
		res.status(200).json({ message: 'You are loggedIn', token });
	} catch (err) {
		res.status(500).json(err);
	}
};

exports.signup = async (req, res) => {
	try {
		const { username, password } = req.body;
		const existingUser = await User.findOne({ username });
		if (existingUser) {
			return next(customError(409, 'Email is already used'));
		}
		const hashedPassword = await bcrypt.hash(password, 10);
		const user = new User({ username, password: hashedPassword });
		const cart = new Cart({ userId: user._id });
		await user.save();
		await cart.save();
		res.status(200).json({ message: 'User created successfully' });
	} catch (err) {
		res.status(500).json(err);
	}
};
