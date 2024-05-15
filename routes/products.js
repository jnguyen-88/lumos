const express = require('express');
const Product = require('../models/product');
const productsIndexTemplate = require('../views/products/index');
const productShowTemplate = require('../views/products/show');

const router = express.Router();

router.get('/', async (req, res) => {
  const products = await Product.find({});
  res.send(productsIndexTemplate({ products }));
});

router.get('/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.send(productShowTemplate({ product }));
});

module.exports = router;
