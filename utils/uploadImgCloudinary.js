const cloudinary = require('cloudinary').v2;
const ApiError = require('./apiError');
require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

exports.uploadImage = async (file, folder) => {
  try {
    const result = await cloudinary.uploader.upload(file, { folder });
    return { url: result.url };
  } catch (err) {
    return new ApiError('failed to upload to cloudinary', 500);
  }
};
