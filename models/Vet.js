const mongoose = require('mongoose');

const vetSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialty: { type: String, required: true },
  clinic_name: { type: String, required: true },
  address: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Vet', vetSchema);
