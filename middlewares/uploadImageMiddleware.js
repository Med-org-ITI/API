const multer = require('multer');
const ApiError = require('../utils/apiError');

const multerOptions = () => {
	//nMemoryStorage engine

	const multerStorage = multer.memoryStorage();
	const multerFilter = (req, file, cb) => {
		if (file.mimetype.startsWith('image')) {
			cb(null, true);
		} else {
			cb(new ApiError('Only Images allowed', 400), false);
		}
	};
	const upload = multer({
		storage: multerStorage,
		fileFilter: multerFilter,
	});
	return upload;
};

exports.uploadSingleImage = fieldName => multerOptions().single(fieldName);

exports.uploadMixOfImages = arrayOfOields => multerOptions().fields(arrayOfOields);
