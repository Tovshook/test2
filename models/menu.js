const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  category: {
    type: String,
    enum: ['drink', 'main', 'dessert'],
    default: 'main'
  },
  available: {
    type: Boolean,
    default: true
  },
  image: {
    type: String // optional image URL
  }
}, { timestamps: true });

module.exports = mongoose.model('Menu', menuSchema);
