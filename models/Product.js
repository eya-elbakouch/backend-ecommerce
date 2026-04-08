const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: false }, // Optional, for frontend display
  target_animal_type: { type: String, required: false }, // For smart recommendations
  target_age: { type: Number, required: false },
  target_weight: { type: Number, required: false },
  is_gadget: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
