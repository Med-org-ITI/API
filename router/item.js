const { Router } = require('express');
const { allItems, createItem, deleteItem, updateItem } = require('../controller/item');
const isAuth = require('../middleware/is-auth');

const router = Router();

router.get('/', allItems);
router.post('/', isAuth, createItem);
router.delete('/', deleteItem);
router.patch('/', updateItem);

module.exports = router;
