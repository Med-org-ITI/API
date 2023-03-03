const sharp = require('sharp');
const { v4: uuidv4 } = require('uuid');
const asyncHandler = require('express-async-handler');

const newsItem = require('../models/newsItemModel');
const factory = require('./handlerFactory');

const { uploadSingleImage } = require('../middlewares/uploadImageMiddleware');
const { uploadImage } = require('../utils/uploadImgCloudinary');

exports.uploadItemImage = uploadSingleImage('image');

// Image processing
exports.resizeImage = asyncHandler(async (req, file, next) => {
  const filename = `newsitem-${uuidv4()}-${Date.now()}.jpeg`;
  if (req.file) {
    await sharp(req.file.buffer)
      .resize(600, 600)
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(`uploads/newsitems/${filename}`);
    req.body.image = (
      await uploadImage(`uploads/newsitem/${filename}`, 'items')
    ).url;
  }

  next();
});

// Nested route
// GET /api/v1/users/:userId/items
// GET /api/v1/proudcts/:productId/reviews
exports.createFilterObj = (req, res, next) => {
  let filterObject = {};
  if (req.params.userId) filterObject = { userId: req.params.userId };
  req.filterObj = filterObject;
  next();
};

// @des Create newitem
// @route POST /items
// @access Private
exports.createNewsItem = factory.createOne(newsItem);

// @des Get list of NewsItems
// @route GET /NewsItems
// @access Public
exports.getNewsItems = factory.getAll(newsItem);

// @des Get specific NewsItem by Id
// @route GET /NewsItems/:id
// @access Public
exports.getNewsItem = factory.getOne(newsItem);
