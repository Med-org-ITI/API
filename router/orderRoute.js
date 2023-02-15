const express = require('express');
const {
  allOrders,
  getOrder,
  userOrders,
  userCompletedOrders,
  createOrder,
} = require('../controller/orderController');
const adminAuth = require('../middlewares/admin-auth');
const isAuth = require('../middlewares/is-auth');

const router = express.Router();

router.get('/', adminAuth, allOrders);
router.get('/:orderId', adminAuth, getOrder);
router.get('/users/:id/orders', isAuth, userOrders);
router.get('/users/:id/completedOrders', adminAuth, userCompletedOrders);
router.post('/', isAuth, createOrder);

module.exports = router;
