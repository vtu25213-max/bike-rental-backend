const mongoose = require('mongoose');

const bikeSchema = new mongoose.Schema({
  name: String,
  type: String,
  price: Number,
  available: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model('Bike', bikeSchema);
