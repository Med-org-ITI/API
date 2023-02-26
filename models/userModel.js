const Mongoose = require('mongoose');
const bcrypt = require('bcrypt');
// 1- Create Schema
const userSchema = new Mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'name is required'],
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
      passwordChangedAt: Date,
      passwordResetCode: String,
      passwordResetExpires: Date,
      passwordResetVerified: Boolean,
    },
    role: {
      type: String,
      enum: ['user', 'admin', 'manager'],
      default: 'user',
    },
    address: {
      type: String,
    },
    gender: {
      type: String,
    },
    profileImage: String,
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

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  // Hashing user password
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// 2- Create Model
module.exports = Mongoose.model('user', userSchema);
