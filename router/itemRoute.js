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

// mergeParms: Allow us to access parameteres on other routers
const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(createFilterObj, getItems)
  .post(uploadItemImage, resizeImage, createItemValidator, createItem);

router
  .route('/:id')
  .get(getItemValidator, getItem)
  .put(uploadItemImage, resizeImage, updateItemValidator, updateItem)
  .delete(deleteItemValidator, deleteItem);

module.exports = router;
