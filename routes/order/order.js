const express = require('express');
const { Order } = require('../../models');
const authenticateToken = require('../../middleware/auth');
const router = express.Router();

// POST /api/orders - Create order
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { table, items } = req.body;
    const newOrder = new Order({
      table,
      items,
      orderedBy: req.user.id
    });
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/orders/:id/cook - Mark as cooking
router.put('/:id/cook', authenticateToken, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    order.status = 'cooking';
    order.cookedBy = req.user.id;
    await order.save();
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/orders/:id/serve - Mark as served
router.put('/:id/serve', authenticateToken, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    order.status = 'served';
    order.servedBy = req.user.id;
    await order.save();
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/orders?status=ready - Get orders by status
router.get('/', authenticateToken, async (req, res) => {
  try {
    const status = req.query.status;
    const filter = status ? { status } : {};
    const orders = await Order.find(filter)
      .populate('table')
      .populate('orderedBy', 'username')
      .populate('cookedBy', 'username')
      .populate('servedBy', 'username');
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
