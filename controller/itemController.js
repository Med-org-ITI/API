const sharp = require('sharp');
const fs = require('fs/promises');
const { v4: uuidv4 } = require('uuid');
const asyncHandler = require('express-async-handler');

const Item = require('../models/itemModel');
const factory = require('./handlerFactory');

const { uploadSingleImage } = require('../middlewares/uploadImageMiddleware');

exports.uploadItemImage = uploadSingleImage('image');

// Image processing
exports.resizeImage = asyncHandler(async (req, file, next) => {
	const filename = `item-${uuidv4()}-${Date.now()}.jpeg`;
	if (req.file) {
		await sharp(req.file.path)
			.resize(600, 600)
			.toFormat('jpeg')
			.jpeg({ quality: 90 })
			.toFile(`uploads/items/${filename}`);
		await fs.unlink(req.file.path);
	}

	// save image into our db
	req.body.image = `${process.env.BASE_URL}/uploads/items/${filename}`;
	next();
});

exports.setUserIdToBody = (req, res, next) => {
	// Nested route
	if (!req.body.user) req.body.user = req.params.userId;
	next();
};

// Nested route
// GET /api/v1/users/:userId/items
// GET /api/v1/proudcts/:productId/reviews
exports.createFilterObj = (req, res, next) => {
	let filterObject = {};
	if (req.params.userId) filterObject = { userId: req.params.userId };
	req.filterObj = filterObject;
	next();
};

// @des Create item
// @route POST /api/iti/items
// @access Private
exports.createItem = factory.createOne(Item);

// @des Get list of items
// @route GET /api/iti/items
// @access Public
exports.getItems = factory.getAll(Item);

// @des Get specific item by Id
// @route GET /api/iti/items/:id
// @access Public
exports.getItem = factory.getOne(Item);

// @des Update specific item by Id
// @route UPDATE /api/iti/items/:id
// @access Private

exports.updateItem = factory.updateOne(Item);
// @des Delete specific item by Id
// @route DELETE /api/iti/items/:id
// @access Private
exports.deleteItem = factory.deleteOne(Item);
