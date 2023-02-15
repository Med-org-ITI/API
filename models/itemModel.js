const Mongoose = require('mongoose');

const itemSchema = new Mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      lowercase: true,
    },
    description: String,
    price: {
      type: Number,
      required: true,
    },
    userId: {
      type: Mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'item must be belong to user'],
    },
  },
  { timestamps: true }
);

module.exports = Mongoose.model('Item', itemSchema);
