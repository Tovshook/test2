const express = require('express');
const { Menu } = require('../../models');
const authenticateToken = require('../../middleware/auth');
const router = express.Router();

// POST /api/menu — Хоол нэмэх
router.post('/', async (req, res) => {
  try {
    const newItem = new Menu(req.body);
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/menu — Хоолны жагсаалт
router.get('/', async (req, res) => {
  try {
    const items = await Menu.find();
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
