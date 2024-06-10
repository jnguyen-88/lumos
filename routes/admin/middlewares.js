const { validationResult, body } = require('express-validator');
const { productSchema } = require('../../schemas');
const ExpressError = require('../../public/javascripts/ExpressError');

module.exports = {
  validateProduct(req, res, next) {
    const { error } = productSchema.validate(req.body);
    if (error) {
      const msg = error.details.map((el) => el.message).join(',');
      const err = new ExpressError(msg, 400);
      next(err);
    } else {
      next();
    }
  },
  checkFileCount(req, res, next) {
    upload(req, res, (err) => {
      if (err) {
        return next(err);
      }
      if (!req.files || req.files.length !== 2) {
        req.flash('error', 'You must upload exactly 2 images.');
        return res.redirect('/admin/products/new');
      }
      next();
    });
  },
  validateProductData: [
    body('product.title').notEmpty().withMessage('Title is required'),
    body('product.price')
      .isFloat({ gt: 0 })
      .withMessage('Price must be greater than 0'),
    body('product.description')
      .notEmpty()
      .withMessage('Description is required')
  ],
  validateSignup: [
    body('email').isEmail().withMessage('Enter a valid email address'),
    body('password')
      .isLength({ min: 4 })
      .withMessage('Password must be at least 4 characters long')
  ],
  handleErrors(templateFunc, dataCb) {
    return async (req, res, next) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        let data = {};
        if (dataCb) {
          data = await dataCb(req);
        }

        return res.send(templateFunc({ errors, ...data }));
      }

      next();
    };
  },
  requireAuth(req, res, next) {
    if (!req.session.userId) {
      return res.redirect('/signin');
    }

    next();
  },
  isLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
      req.flash('error', 'You must be signed in');
      req.session.returnTo = req.originalUrl;
      return res.redirect('/signin');
    }
    next();
  },
  storeReturnTo(req, res, next) {
    if (req.session.returnTo) {
      res.locals.returnTo = req.session.returnTo;
    }
    next();
  }
};
