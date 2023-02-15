// const { number } = require('joi');
const Mongoose = require('mongoose');
// 1- Create Schema
const userShema = new Mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'name is required'],
      unique: true,
      minLength: [3, 'name must be more than 3 chracter'],
      maxLength: [32, 'name must be less than 32 chracter'],
    },
    // A and b => shopping.com/a-and-b
    slug: {
      type: String,
      lowercase: true,
    },
    email: {
      type: String,
      required: [true, 'email is required'],
      unique: true,
      lowercase: true,
    },
    phone: String,
    profileImg: String,
    password: {
      type: String,
      required: true,
      minLength: [6, 'Too short password'],
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    address: {
      type: String,
    },
    gender: {
      type: String,
    },
    active: {
      type: Boolean,
      default: true,
    },
    rating: {
      type: Number,
      min: [1, 'Rating must be above or equal 1.0'],
      max: [5, 'Rating must be below or equal 5.0'],
    },
  },
  { timestamps: true }
);

// 2- Create Model
module.exports = Mongoose.model('user', userShema);
