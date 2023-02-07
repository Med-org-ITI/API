const { Schema, model } = require('mongoose');

const cartSchema = new Schema({
	items: {
		type: [{ itemId: Schema.Types.ObjectId, price: Number, quantity: Number }],
		ref: 'Item',
		required: true,
		default: [],
	},
	total: {
		type: Number,
		required: true,
		default: 0,
	},
	userId: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
});

const Cart = model('Cart', cartSchema);

module.exports = Cart;
