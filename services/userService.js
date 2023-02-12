const { v4: uuidv4 } = require('uuid');
const sharp = require('sharp');

const { uploadSingleImage } = require('../middlewares/uploadImageMiddleware');

// Upload single image
exports.uploadUserImage = uploadSingleImage('profileImage');

// Image processing
exports.resizeImage = async (req, res, next) => {
  const filename = `user-${uuidv4()}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .toFormat('jpeg')
    .jpeg({ quality: 95 })
    .toFile(`uploads/users/${filename}`);

  // Save image into our db 
   req.body.image = filename;

  next();
};