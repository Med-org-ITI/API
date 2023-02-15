const Cart = require('../models/cartModel');

// IMPORTANT  check if the cart belongs to the user who is sending the request
exports.addToCart = async (req, res) => {
  try {
    const { quantity, itemId, price } = req.body;
    const { cartId } = req.params;
    const cart = await Cart.findById(cartId);
    cart.total += price * quantity;
    const itemIndex = cart.items.findIndex((i) => i.itemId === itemId);
    if (itemIndex > -1) {
      const existingItem = cart.items[itemIndex];
      existingItem.quantity += +quantity;
      cart.items[itemIndex] = existingItem;
    } else {
      cart.items.push({ itemId, price, quantity });
    }
    await cart.save();
    res.status(201).json(cart);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const { itemId, price } = req.body;
    const { cartId } = req.params;
    const cart = await Cart.findById(cartId);
    const itemIndex = cart.items.findIndex((i) => i.itemId === itemId);
    const existingItem = cart.items[itemIndex];
    cart.total -= price;
    if (existingItem.quantity > 1) {
      existingItem.quantity -= 1;
      cart.items[itemIndex] = existingItem;
    } else {
      cart.items.splice(itemIndex, 1);
    }
    await cart.save();
    res.status(201).json(cart);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.clearCart = async (req, res) => {
  try {
    const { cartId } = req.params;
    const cart = await Cart.findById(cartId);
    cart.items = [];
    cart.total = 0;
    await cart.save();
    res.status(200).json('cart cleared');
  } catch (err) {
    res.status(500).json(err);
  }
};
