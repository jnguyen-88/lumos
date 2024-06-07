const express = require('express');
const passport = require('passport');

const { handleErrors, storeReturnTo } = require('./middlewares');
const signupTemplate = require('../../views/admin/auth/signup');
const signinTemplate = require('../../views/admin/auth/signin');
const checkAsync = require('../../public/javascripts/checkAsync');
const User = require('../../models/user');

// const {
//   requireEmail,
//   requirePassword,
//   requirePasswordConfirmation
// } = require('./validators');

const router = express.Router();

// SignUP
router.get('/signup', (req, res) => {
  res.send(signupTemplate({ req }));
});

router.post(
  '/signup',
  handleErrors(signupTemplate),
  checkAsync(async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = new User({ email });
      const registeredUser = await User.register(user, password);

      req.flash(
        'success',
        'Successfully Registered New User. Welcome to Lumos!'
      );
      req.session.userId = registeredUser._id;
      res.redirect('/admin/products');
    } catch (error) {
      req.flash('error', 'Registration failed. Please try again.');
      res.redirect('/signup');
    }
  })
);

// SignIN
router.get('/signin', (req, res) => {
  res.send(
    signinTemplate({
      flashSuccess: res.locals.flashSuccess,
      flashError: res.locals.flashError,
      currentUser: res.locals.currentUser
    })
  );
});

router.post(
  '/signin',
  storeReturnTo,
  passport.authenticate('local', {
    failureFlash: 'Invalid email or password.', // Flash message on failure
    failureRedirect: '/signin' // Redirect to sign-in page on failure
  }),
  (req, res) => {
    req.flash('success', 'Welcome back!');
    const redirectUrl = res.locals.returnTo || '/admin/products';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
  }
);

// SignOUT
router.get('/signout', (req, res, next) => {
  req.logout((error) => {
    if (error) {
      return next(error);
    }
    req.flash('success', 'You are logged out');
    res.redirect('/');
  });
});

module.exports = router;
