const express = require('express');
const checkAsync = require('../public/javascripts/checkAsync');
const cartShowTemplate = require('../views/carts/show');
const mainTemplate = require('../views/layout');
const Cart = require('../models/cart');
const Product = require('../models/product');

const router = express.Router();

// Helper function to calculate cart total
const calculateTotal = (cart) => {
  return cart.items.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );
};

// ADD item to Cart
router.post(
  '/products',
  checkAsync(async (req, res) => {
    const { productId, quantity: quantityString } = req.body.cart;
    const quantity = parseInt(quantityString, 10); // Convert 'quantity' to a number
    const userId = req.user._id;
    const product = await Product.findById(productId);

    if (!product) {
      req.flash('error', 'Product not found');
      return res.redirect('/');
    }

    let cart = await Cart.findOne({ user: userId });

    if (cart) {
      const itemIndex = cart.items.findIndex(
        (item) => item.product.toString() === productId
      );
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
        cart.total += product.price * quantity;
      } else {
        cart.items.push({ product: productId, quantity, price: product.price });
        cart.total += product.price * quantity;
      }
      await cart.save();
    } else {
      // Create new cart if not existing
      const newCart = new Cart({
        user: userId,
        items: [{ product: productId, quantity, price: product.price }],
        total: product.price * quantity // Initial total calculation
      });
      await newCart.save();
    }

    req.flash('success', 'Item added to cart');
    res.redirect('/cart');
  })
);

// GET all items in Cart
router.get(
  '/',
  checkAsync(async (req, res) => {
    const userId = req.user._id;
    const cart = await Cart.findOne({ user: userId }).populate('items.product');

    const cartItemCount = cart
      ? cart.items.reduce((total, item) => total + item.quantity, 0)
      : 0;

    res.send(
      cartShowTemplate({
        cart,
        cartItemCount,
        currentUser: req.user,
        flashSuccess: res.locals.flashSuccess,
        flashError: res.locals.flashError
      })
    );
  })
);

// DELETE item from Cart
router.delete(
  '/:id',
  checkAsync(async (req, res) => {
    const { id } = req.params;
    const cart = await Cart.findOne(); // There's only one cart for now

    if (cart) {
      // Filter OUT the item with the given product ID
      const updatedItems = cart.items.filter(
        (item) => item._id.toString() !== id
      );
      cart.items = updatedItems;
      cart.total = updatedItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
      req.flash('success', 'Removed item from cart');
      req.flash('error', 'Oops! Unable to remove item from cart');
      await cart.save();
    }
    res.redirect('/cart');
  })
);

module.exports = router;
