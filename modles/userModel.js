const Mongoose = require("mongoose");
// 1- Create Schema
const userShema = new Mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      minLength: [3, "name must be more than 3 chracter"],
      maxLength: [32, "name must be less than 32 chracter"],
    },
    // A and b => shopping.com/a-and-b
    slug: {
      type: String,
      lowercase: true,
    },
  },
  { timestamps: true }
);

// 2- Create Model
module.exports = Mongoose.model("user", userShema);
