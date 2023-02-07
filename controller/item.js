const Item = require('../models/item');

exports.allItems = async (req, res) => {
	try {
		const items = await Item.find();
		res.status(200).json({ message: 'fetched items sucessfully', items });
	} catch (err) {
		res.status(500).json(err);
	}
};

exports.createItem = async (req, res) => {
	try {
		const { title, description, price } = req.body;
		const item = new Item({ title, description, price, userId: res.locals.userId });
		await item.save();
		res.status(200).json({ message: 'item created!', item });
	} catch (err) {
		res.status(500).json(err);
	}
};

exports.deleteItem = (req, res) => {};

exports.updateItem = (req, res) => {};
