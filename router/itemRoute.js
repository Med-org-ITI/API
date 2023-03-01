const express = require('express');
const {
	getItems,
	getItem,
	createFilterObj,
	createItem,
	deleteItem,
	updateItem,
	uploadItemImage,
	resizeImage,
} = require('../controller/itemController');

const {
	getItemValidator,
	createItemValidator,
	updateItemValidator,
	deleteItemValidator,
} = require('../utils/validators/itemValidator');

const authService = require('../controller/authController');

// mergeParms: Allow us to access parameteres on other routers
const router = express.Router({ mergeParams: true });

router
	.route('/')
	.get(createFilterObj, getItems)
	.post(
		authService.protect,
		authService.allowedTo('admin', 'manager'),
		uploadItemImage,
		resizeImage,
		createItemValidator,
		createItem
	);

router
	.route('/:id')
	.get(authService.protect, authService.allowedTo('admin', 'manager'), getItemValidator, getItem)
	.put(
		authService.protect,
		authService.allowedTo('admin', 'manager'),
		uploadItemImage,
		resizeImage,
		updateItemValidator,
		updateItem
	)
	.delete(authService.protect, authService.allowedTo('admin'), deleteItemValidator, deleteItem);

module.exports = router;
