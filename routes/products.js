const express = require('express');
const Product = require('../models/product');
const Cart = require('../models/cart');
const checkAsync = require('../public/javascripts/checkAsync');
const productsIndexTemplate = require('../views/products/index');
const productShowTemplate = require('../views/products/show');
const mongoose = require('mongoose');

const router = express.Router();

//GET all Products
router.get(
  '/',
  checkAsync(async (req, res) => {
    const allProducts = await Product.find({});
    const featuredProducts = await Product.find({ isFeatured: true });

    // Number of items inside of Cart
    let cartItemCount = 0;
    if (req.user) {
      const cart = await Cart.findOne({ user: req.user._id });
      cartItemCount = cart
        ? cart.items.reduce((total, item) => total + item.quantity, 0)
        : 0;
    }

    res.send(
      productsIndexTemplate({
        allProducts,
        featuredProducts,
        cartItemCount,
        flashSuccess: res.locals.flashSuccess,
        currentUser: res.locals.currentUser
      })
    );
  })
);

module.exports = router;
