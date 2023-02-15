const express = require('express');

const adminController = require('../controller/adminController');

const router = express.Router();

router.get('/', adminController.getItems);

router.post('/', adminController.createItem);

router.delete('/', adminController.deleteItem);

router.patch('/', adminController.updateItem);

module.exports = router;
