const express = require('express');
const multer = require('multer');
const Product = require('../../models/product');

const methodOverride = require('method-override');

const { handleErrors, requireAuth } = require('./middlewares');
const productsRepo = require('../../repositories/products');
const productsNewTemplate = require('../../views/admin/products/new');
const productsIndexTemplate = require('../../views/admin/products/index');
const productsEditTemplate = require('../../views/admin/products/edit');
const { requireTitle, requirePrice } = require('./validators');
const products = require('../../views/products');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get('/admin/products', requireAuth, async (req, res) => {
  const products = await Product.find({});
  res.send(productsIndexTemplate({ products }));
});

router.get('/admin/products/new', requireAuth, (req, res) => {
  res.send(productsNewTemplate({}));
});

router.put('/admin/products/:id', requireAuth, async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, {
    ...req.body.product
  });
  res.redirect('/admin/products');
});

router.delete('/admin/products/:id', requireAuth, async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  res.redirect('/admin/products');
});

router.post(
  '/admin/products/new',
  requireAuth,
  upload.single('image'),
  [requireTitle, requirePrice],
  handleErrors(productsNewTemplate),
  async (req, res) => {
    const product = new Product(req.body.product);
    await product.save();
    res.redirect(`/${product._id}`);
  }
);

router.get('/admin/products/:id/edit', requireAuth, async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.send('Product not found');
  }

  res.send(productsEditTemplate({ product }));
});

router.post(
  '/admin/products/:id/edit',
  requireAuth,
  upload.single('image'),
  [requireTitle, requirePrice],
  handleErrors(productsEditTemplate, async (req) => {
    const product = await Product.findById(req.params.id);
    return { product };
  }),
  async (req, res) => {
    const changes = req.body;

    if (req.file) {
      changes.image = req.file.buffer.toString('base64');
    }

    try {
      await productsRepo.update(req.params.id, changes);
    } catch (err) {
      return res.send('Could not find item');
    }

    res.redirect('/admin/products');
  }
);

// router.post('/admin/products/:id/delete', requireAuth, async (req, res) => {
//   await productsRepo.delete(req.params.id);

//   res.redirect('/admin/products');
// });

module.exports = router;
