const router = require('express').Router();
const { protect, allowedTo } = require('../controller/authController');
const cartController = require('../controller/cartController');

// router.use(protect);
router.get('/', protect, allowedTo('user'), cartController.getCart);
router.post('/items', protect, allowedTo('user'), cartController.addToCart);
router.post('/remove', protect, allowedTo('user'), cartController.removeFromCart);
router.post('/remove/item', protect, allowedTo('user'), cartController.removeCartItem);
router.get('/clear', protect, allowedTo('user'), cartController.clearCart);

module.exports = router;
