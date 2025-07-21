const express = require('express');
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const { auth, admin } = require('../middleware/auth');

const router = express.Router();

// Place order (from cart)
router.post('/place', auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.userId }).populate('items.product');
    if (!cart || cart.items.length === 0) return res.status(400).json({ message: 'Cart is empty' });
    const total = cart.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const order = new Order({
      user: req.user.userId,
      items: cart.items.map(item => ({ product: item.product._id, quantity: item.quantity })),
      total,
      status: 'placed',
    });
    await order.save();
    cart.items = [];
    await cart.save();
    res.status(201).json({ message: 'Order placed successfully', order });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user's orders
router.get('/my', auth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.userId }).populate('items.product');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin: get all orders
router.get('/all', auth, admin, async (req, res) => {
  try {
    const orders = await Order.find().populate('user').populate('items.product');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 