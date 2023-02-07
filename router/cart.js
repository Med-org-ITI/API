const { Router } = require('express');
const { addToCart, removeFromCart, clearCart } = require('../controller/cart');
const isAuth = require('../middleware/is-auth');

const router = Router();

// router.post('/:itemId', addToCart); userId,cartId from token, item from param, quantity body

// quantity and item from body, cart from param and userId from token
router.post('/:cartId/items', isAuth, addToCart);
router.post('/:cartId/remove', isAuth, removeFromCart);
router.get('/:cartId/clear', isAuth, clearCart);

module.exports = router;
