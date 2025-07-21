const express = require('express');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Get user's cart
router.get('/', auth, async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user.userId }).populate('items.product');
    if (!cart) cart = await Cart.create({ user: req.user.userId, items: [] });
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add a product to the cart
router.post('/add', auth, async (req, res) => {
  const { productId, quantity, size, color } = req.body;
  try {
    let cart = await Cart.findOne({ user: req.user.userId });
    if (!cart) {
      cart = new Cart({ user: req.user.userId, items: [] });
    }

    let itemIndex = -1;
    if (size || color) {
      itemIndex = cart.items.findIndex(p => p.product == productId && p.size === size && p.color === color);
    } else {
      itemIndex = cart.items.findIndex(p => p.product == productId);
    }

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity, size, color });
    }

    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Remove a product from the cart
router.post('/remove', auth, async (req, res) => {
  const { productId } = req.body; // Assuming removal is by unique item ID in cart
  try {
    const cart = await Cart.findOne({ user: req.user.userId });
    if (cart) {
      cart.items = cart.items.filter(item => item._id.toString() !== productId);
      await cart.save();
    }
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Clear cart
router.post('/clear', auth, async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user.userId });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });
    cart.items = [];
    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 