const express = require('express');
const layout = require('../views/layout');
const ExpressError = require('../public/javascripts/ExpressError');
const errorsTemplate = require('../views/error');

const router = express.Router();

// Catch non-existing routes
router.all('*', (req, res, next) => {
  next(new ExpressError('Page Not Found', 404));
});

module.exports = router;
