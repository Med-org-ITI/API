const multer = require('multer');
const ApiError = require('../utils/apiError');

const multerOptions = () => {
  // 1) DiskStorage engine
  // const multerStorage = multer.diskStorage({
  //   destination: function (req, filr, cb) {
  //     cb(null, 'uploads/users');
  //   },

  //   filename: function (req, file, cb) {
  //     // category-${id}-Date.now()-ext
  //     const ext = file.mimetype.split('/')[1];
  //     const filename = `category-${uuidv4()}-${Date.now()}.${ext}`;
  //     cb(null, filename);
  //   },
  // });

  // 2) MemoryStorage engine

  const multerStorage = multer.memoryStorage();

  const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
      cb(null, true);
    } else {
      cb(new ApiError('Only Images allowed', 400), false);
    }
  };

  const upload = multer({ storage: multerStorage, fileFilter: multerFilter });
  return upload;
};

exports.uploadSingleImage = (fieldName) => multerOptions().single(fieldName);

exports.uploadMixOfImages = (arrayOfOields) =>
  multerOptions().fields(arrayOfOields);
