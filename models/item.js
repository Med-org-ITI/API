const { Schema, model } = require('mongoose');

const itemSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		description: String,
		price: {
			type: Number,
			required: true,
		},
		userId: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
	},
	{ timestamps: true }
);

const Item = model('Item', itemSchema);
module.exports = Item;
