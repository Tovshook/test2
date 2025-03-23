const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  //Ширээ
  table: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Table',
    required: true
  },

  //Захиалсан хоол
  menu: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Menu',
    required: true
  },

  // Зөөгч захиалга үүсгэсэн
  orderedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  // Тогооч хийсэн
  cookedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },

  // Зөөгч хүргэсэн
  servedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },

  status: {
    type: String,
    enum: ['ordered', 'cooking', 'ready', 'served', 'cancelled'],
    default: 'ordered'
  }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
