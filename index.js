if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const authRouter = require('./routes/admin/auth');
const adminProductsRouter = require('./routes/admin/products');
const productsRouter = require('./routes/products');
const cartsRouter = require('./routes/carts');
const errorsRouter = require('./routes/error');
const flash = require('connect-flash');
const methodOverride = require('method-override');
const errorTemplate = require('./views/error');
const session = require('express-session');
const MongoDBStore = require('connect-mongo')(session);
const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/lumos';
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');

//Mongoose Config
const mongoose = require('mongoose');
const Product = require('./models/product');
const { MongoStore } = require('connect-mongo');

async function main() {
  try {
    // Establish connection to the Lumos db
    await mongoose.connect(dbUrl);
    console.log('MONGO Connection open');
  } catch (err) {
    console.log('An error occurred:', err);
    mongoose.disconnect();
  }
}

main();

//Express Config
const app = express();

const secret = 'thisisnotagoodsecret';

const store = new MongoDBStore({
  url: dbUrl,
  secret,
  touchAfter: 24 * 3600
});

store.on('error', function (e) {
  console.log('Session Store error', e);
});

//Session Config
const sessionConfig = {
  store,
  name: 'session',
  secret,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7
  }
};
app.use(session(sessionConfig));
app.use(flash());

// Passport Config
app.use(passport.initialize());
app.use(passport.session());
passport.use(
  new LocalStrategy(
    { usernameField: 'email', passwordField: 'password' },
    User.authenticate()
  )
);
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.flashSuccess = req.flash('success');
  res.locals.flashError = req.flash('error');
  res.locals.currentUser = req.user;
  next();
});

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.use('/admin', adminProductsRouter);
app.use(authRouter);
app.use(productsRouter);
app.use('/cart', cartsRouter);
app.use(errorsRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500);
  res.send(errorTemplate({ err }));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Listening on port:' + port);
});
