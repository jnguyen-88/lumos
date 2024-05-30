const express = require('express');
const checkAsync = require('../utils/checkAsync');
const cartShowTemplate = require('../views/carts/show');
const mainTemplate = require('../views/layout');
const Cart = require('../models/cart');
const Product = require('../models/product');

const router = express.Router();

//ADD item to Cart
router.post(
  '/products',
  checkAsync(async (req, res) => {
    const { productId, quantity: quantityString } = req.body.cart;
    const quantity = parseInt(quantityString, 10); // Convert 'quantity' to a number bc will be String
    const existingCart = await Cart.findOne();
    const product = await Product.findById(productId);

    if (existingCart) {
      const itemIndex = existingCart.items.findIndex(
        (item) => item.product.toString() === productId
      );
      if (itemIndex > -1) {
        existingCart.items[itemIndex].quantity += quantity;
        existingCart.total += product.price * quantity;
      } else {
        existingCart.items.push({
          product: productId,
          quantity,
          price: product.price
        });
        existingCart.total += product.price * quantity;
      }
      await existingCart.save();
    } else {
      // Create new cart if not existing
      const newCart = new Cart({
        items: [{ product: productId, quantity, price: product.price }],
        total: product.price * quantity // Initial total calculation
      });
      await newCart.save();
    }

    res.redirect('/cart');
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
      await cart.save();
    }
    res.redirect('/cart');
  })
);

//GET all items in Cart
router.get(
  '/',
  checkAsync(async (req, res) => {
    const cart = await Cart.findOne().populate('items.product');

    const cartItemCount = cart
      ? cart.items.reduce((total, item) => total + item.quantity, 0)
      : 0;

    res.send(cartShowTemplate({ cart, cartItemCount }));
  })
);

module.exports = router;
