const express = require('express');
const {
  getItems,
  getItem,
  createFilterObj,
  createItem,
  deleteItem,
  updateItem,
} = require('../controller/itemController');

// mergeParms: Allow us to access parameteres on other routers
const router = express.Router({ mergeParams: true });

router.route('/').get(createFilterObj, getItems).post(createItem);

router.route('/:id').get(getItem).put(updateItem).delete(deleteItem);

module.exports = router;
