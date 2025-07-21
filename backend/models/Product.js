const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true }, // URL to image
  category: { type: String, required: true },
  sizes: { type: [String], default: [] },
  colors: { type: [String], default: [] },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema); 