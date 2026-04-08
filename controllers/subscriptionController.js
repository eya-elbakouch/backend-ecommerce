const Subscription = require('../models/Subscription');

const createSubscription = async (req, res) => {
  try {
    const { product_id, frequency } = req.body;
    const subscription = new Subscription({
      user_id: req.user._id,
      product_id,
      frequency,
      next_billing_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    });
    const createdSubscription = await subscription.save();
    res.status(201).json(createdSubscription);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserSubscriptions = async (req, res) => {
  try {
    const subscriptions = await Subscription.find({ user_id: req.user._id }).populate('product_id', 'name price image category');
    res.json(subscriptions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const cancelSubscription = async (req, res) => {
  try {
    const subscription = await Subscription.findOne({ _id: req.params.id, user_id: req.user._id });
    if (subscription) {
      subscription.status = 'cancelled';
      await subscription.save();
      res.json({ message: 'Abonnement annulé avec succès.', subscription });
    } else {
      res.status(404).json({ message: 'Abonnement introuvable.' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createSubscription, getUserSubscriptions, cancelSubscription };
