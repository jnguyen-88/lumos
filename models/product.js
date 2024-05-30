const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//2 images per product
const ProductSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  description: {
    type: String
  },
  images: [
    {
      url: String,
      filename: String
    }
  ],
  isFeatured: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Product', ProductSchema);
