const express = require('express');
const multer = require('multer');
const Product = require('../../models/product');
const { storage } = require('../../cloudinary');

const methodOverride = require('method-override');

const {
  handleErrors,
  requireAuth,
  validateProduct,
  isLoggedIn
} = require('./middlewares');
const productsNewTemplate = require('../../views/admin/products/new');
const productsIndexTemplate = require('../../views/admin/products/index');
const productsEditTemplate = require('../../views/admin/products/edit');
const signInTemplate = require('../../views/admin/auth/signin');
const checkAsync = require('../../public/javascripts/checkAsync.js');
const products = require('../../views/products');
const ExpressError = require('../../public/javascripts/ExpressError.js');

const router = express.Router();

const upload = multer({ storage });

// POST route for creating a new product (for Admin only)
router.post(
  '/products/new',
  isLoggedIn,
  upload.array('images', 2),
  checkAsync(async (req, res, next) => {
    const { title, price, description, isFeatured } = req.body.product;
    const featuredStatus = isFeatured ? true : false;

    const productData = {
      title,
      price,
      description,
      isFeatured: featuredStatus,

      images: req.files.map((file) => ({
        url: file.path,
        filename: file.filename
      }))
    };
    await Product.create(productData);
    req.flash('success', 'Created New Product');
    res.redirect(`/admin/products`);
  })
);

// GET route to list all products (for Admin only)
router.get(
  '/products',
  isLoggedIn,
  checkAsync(async (req, res) => {
    const products = await Product.find({});
    res.send(
      productsIndexTemplate({
        products,
        flashSuccess: res.locals.flashSuccess,
        flashError: res.locals.flashError,
        currentUser: res.locals.currentUser
      })
    );
  })
);

// GET route for creating a new product form (for Admin only)
router.get('/products/new', isLoggedIn, (req, res) => {
  res.send(
    productsNewTemplate({
      flashSuccess: res.locals.flashSuccess,
      flashError: res.locals.flashError,
      currentUser: res.locals.currentUser
    })
  );
});

// DELETE route for deleting a product (for Admin only)
router.delete(
  '/products/:id',
  isLoggedIn,
  checkAsync(async (req, res) => {
    const product = await Product.findByIdAndDelete(req.params.id);
    res.redirect('/admin/products');
  })
);

// GET route for editing a product (for Admin only)
router.get(
  '/products/:id/edit',
  isLoggedIn,
  checkAsync(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.send('Product not found');
    }
    res.send(
      productsEditTemplate({
        product,
        flashSuccess: res.locals.flashSuccess,
        flashError: res.locals.flashError,
        currentUser: res.locals.currentUser
      })
    );
  })
);

// PUT route for updating a product (for Admin only)
router.put(
  '/products/:id',
  isLoggedIn,
  upload.array('images', 2),
  (err, req, res, next) => {
    // Error handling middleware for multer
    if (err instanceof multer.MulterError) {
      console.error('Multer error:', err);
      return res.status(500).send('Multer Error: ' + err.message);
    } else if (err) {
      console.error('Unknown Error:', err);
      return res.status(500).send('An unknown error occurred');
    }
    next();
  },
  checkAsync(async (req, res, next) => {
    try {
      const product = await Product.findById(req.params.id);
      const { title, price, description, isFeatured } = req.body.product;
      const updates = {
        title,
        price,
        description,
        isFeatured: isFeatured === 'on'
      };
      // Check if there are new images uploaded
      if (req.files && req.files.length > 0) {
        // Assuming you want to replace the old images
        updates.images = req.files.map((file) => ({
          url: file.path,
          filename: file.filename
        }));
      }
      await Product.updateOne({ _id: req.params.id }, updates);
      res.redirect('/admin/products');
    } catch (error) {
      console.error('Failed to update product:', error);
      res.status(500).send('Failed to update the product');
    }
  })
);

module.exports = router;
