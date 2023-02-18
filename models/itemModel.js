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
    description: {
      type: String,
      required: [true, 'Item description must be required'],
      minLenth: [20, 'Too short product description'],
    },
    price: {
      type: Number,
      required: [true, 'Item price must be required'],
    },
    expiryDate: {
      type: Date,
      required: [true, 'Item expiryDate must be required'],
    },
    quantity: {
      type: Number,
      default: 1,
    },
    userId: {
      type: Mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Item must be belong to user'],
    },
    image: {
      type: String,
      required: [true, 'Item image must be required'],
    },
  },
  { timestamps: true }
);

const setImageUrl = (doc) => {
  if (doc.image) {
    const imageUrl = `${process.env.BASE_URL}/items/${doc.image}`;
    doc.image = imageUrl;
    console.log(process.env.BASE_URL);
  }
};

// findOne, findAll and update
itemSchema.post('init', (doc) => {
  setImageUrl(doc);
});

// create
itemSchema.post('save', (doc) => {
  setImageUrl(doc);
});

module.exports = Mongoose.model('Item', itemSchema);
