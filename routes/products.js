const express = require('express');
const Product = require('../models/product');
const Cart = require('../models/cart');
const checkAsync = require('../utils/checkAsync');
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
    const cart = await Cart.findOne();

    // Number of items inside of Cart
    const cartItemCount = cart
      ? cart.items.reduce((total, item) => total + item.quantity, 0)
      : 0;

    res.send(
      productsIndexTemplate({ allProducts, featuredProducts, cartItemCount })
    );
  })
);

//GET single Product
router.get(
  '/:id',
  checkAsync(async (req, res) => {
    const product = await Product.findById(req.params.id);
    const cart = await Cart.findOne();

    // Number of items inside of Cart
    const cartItemCount = cart
      ? cart.items.reduce((total, item) => total + item.quantity, 0)
      : 0;

    res.send(productShowTemplate({ product, cartItemCount }));
  })
);

module.exports = router;
