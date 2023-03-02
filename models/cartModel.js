const { Schema, model } = require('mongoose');

const cartSchema = new Schema({
	items: {
		type: [{ itemId: { type: Schema.Types.ObjectId, ref: 'Item' }, price: Number, quantity: Number }],
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
