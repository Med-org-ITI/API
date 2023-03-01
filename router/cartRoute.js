const router = require('express').Router();
const { protect, allowedTo } = require('../controller/authController');
const cartController = require('../controller/cartController');

// router.use(protect);
router.post('/items', protect, allowedTo('user'), cartController.addToCart);
router.post('/remove', protect, allowedTo('user'), cartController.removeFromCart);
router.get('/clear', protect, allowedTo('user'), cartController.clearCart);

module.exports = router;
