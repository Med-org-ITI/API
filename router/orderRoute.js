const router = require('express').Router();
const { allowedTo, protect } = require('../controller/authController');
const orderController = require('../controller/orderController');

// router.use(protect);
router.get('/', protect, allowedTo('admin', 'manager'), orderController.allOrders);
router.get('/:orderId', protect, allowedTo('admin', 'manager'), orderController.getOrder);
router.get('/users/:id', protect, allowedTo('user'), orderController.userOrders);
router.get('/users/:id/completedOrders', protect, orderController.userCompletedOrders);
router.post('/', protect, allowedTo('user'), orderController.createOrder);

module.exports = router;
