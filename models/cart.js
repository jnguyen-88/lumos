const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartItemSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: 'Product' },
  quantity: { type: Number, default: 1 },
  price: { type: Number, required: true }
});

const CartSchema = new Schema({
  items: [CartItemSchema],
  total: { type: Number, default: 0 }
});

module.exports = mongoose.model('Cart', CartSchema);
