const express = require('express');
const bcrypt = require('bcrypt');
const { User } = require('../../models');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });
    
    if (existingUser) {
      return res.status(400).json({ message: 'Хэрэглэгчийн нэр аль хэдийн бүртгэгдсэн байна' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'Хэрэглэгч амжилттай бүртгэгдлээ' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
