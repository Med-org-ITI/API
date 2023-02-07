const { Schema, model } = require('mongoose');

const orderSchema = new Schema(
	{
		items: {
			type: [{ itemId: Schema.Types.ObjectId, price: Number, quantity: Number }],
			ref: 'Item',
			required: true,
		},
		total: {
			type: Number,
			requried: true,
		},
		status: {
			type: String,
			required: true,
			default: 'pending',
			enum: ['pending', 'completed', 'canceled'],
		},
		userId: {
			type: Schema.Types.ObjectId,
			requried: true,
			ref: 'User',
		},
	},
	{ timestamps: true }
);

const Order = model('Order', orderSchema);
module.exports = Order;
