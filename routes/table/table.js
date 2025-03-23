const express = require('express');
const { Table } = require('../../models');
const router = express.Router();

// POST /api/tables - Add a new table
router.post('/', async (req, res) => {
  try {
    const { number } = req.body;
    const newTable = new Table({ number });
    await newTable.save();
    res.status(201).json(newTable);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/tables - List all tables
router.get('/', async (req, res) => {
  try {
    const tables = await Table.find();
    res.status(200).json(tables);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;