const Order = require('../models/Order');

const createOrder = async (req, res) => {
  try {
    const { order_items, total_price } = req.body;
    if (order_items && order_items.length === 0) {
      return res.status(400).json({ message: 'No order items' });
    }
    const order = new Order({
      order_items,
      user_id: req.user._id,
      total_price
    });
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user_id: req.user._id }).populate('order_items.product_id');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate('user_id', 'id name email');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateOrderToDelivered = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.is_delivered = true;
      order.delivered_at = Date.now();
      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createOrder, getOrders, getAllOrders, updateOrderToDelivered };
