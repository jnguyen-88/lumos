if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const authRouter = require('./routes/admin/auth');
const adminProductsRouter = require('./routes/admin/products');
const productsRouter = require('./routes/products');
const cartsRouter = require('./routes/carts');
const errorsRouter = require('./routes/error');
const methodOverride = require('method-override');
const errorTemplate = require('./views/error');

//Mongoose Config
const mongoose = require('mongoose');
const Product = require('./models/product');

async function main() {
  try {
    // Establish connection to the Lumos db
    await mongoose.connect('mongodb://localhost:27017/lumos');
    console.log('MONGO Connection open');
  } catch (err) {
    console.log('An error occurred:', err);
    mongoose.disconnect();
  }
}

main();

//Express Config
const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(
  cookieSession({
    keys: ['lkasld235j']
  })
);
app.use('/admin', adminProductsRouter);
app.use(authRouter);
app.use('/products', productsRouter);
app.use('/cart', cartsRouter);
app.use(errorsRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500);
  res.send(errorTemplate({ err }));
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
