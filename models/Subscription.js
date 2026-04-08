const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  frequency: { type: String, enum: ['monthly', 'weekly', 'bi-weekly'], default: 'monthly' },
  status: { type: String, enum: ['active', 'paused', 'cancelled'], default: 'active' },
  next_billing_date: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('Subscription', subscriptionSchema);
