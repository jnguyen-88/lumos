const { validationResult } = require('express-validator');
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
