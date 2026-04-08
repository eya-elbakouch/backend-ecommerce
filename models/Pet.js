const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  race: { type: String, required: false },
  age: { type: Number, required: true },
  weight: { type: Number, required: true },
  image: { type: String, required: false }
}, { timestamps: true });

module.exports = mongoose.model('Pet', petSchema);
