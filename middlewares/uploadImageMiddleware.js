const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const ApiError = require('../utils/apiError');

const multerOptions = () => {
  const multerStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/users');
    },
    filename: function (req, file, cb) {
      const filename = `user-${uuidv4()}-${Date.now()}.${file.originalname}`;
      cb(null, filename); //null --> means that not found error
    },
  });

  const multerFilter = function (req, file, cb) {
    if (file.mimetype.startsWith('image')) {
      cb(null, true);
    } else {
      cb(new ApiError('Only Images allowed', 400), false); // false if exist error (failed)
    }
  };

  const upload = multer({ storage: multerStorage, fileFilter: multerFilter });
  return upload;
};

exports.uploadSingleImage = (image) => multerOptions().single(image);

exports.uploadMixesImages = (arrayOfImages) =>
  multerOptions().fields(arrayOfImages);
