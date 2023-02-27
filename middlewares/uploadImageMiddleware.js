const multer = require('multer');
const ApiError = require('../utils/apiError');

const multerOptions = () => {
	//nMemoryStorage engine

	// const multerStorage = multer.memoryStorage();
	const fileStorage = multer.diskStorage({
		destination: (req, file, cb) => {
			cb(null, 'uploads/profile');
		},
		filename: (req, file, cb) => {
			cb(null, `${Date.now()} - ${file.originalname}`);
		},
	});

	const multerFilter = (req, file, cb) => {
		if (file.mimetype.startsWith('image')) {
			cb(null, true);
		} else {
			cb(new ApiError('Only Images allowed', 400), false);
		}
	};
	const upload = multer({
		storage: fileStorage,
		fileFilter: multerFilter,
	});
	return upload;
};

exports.uploadSingleImage = fieldName => multerOptions().single(fieldName);

exports.uploadMixOfImages = arrayOfOields => multerOptions().fields(arrayOfOields);
