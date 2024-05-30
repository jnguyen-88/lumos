const { validationResult } = require('express-validator');
const { productSchema } = require('../../schemas');
const ExpressError = require('../../utils/ExpressError');

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
  }
};
