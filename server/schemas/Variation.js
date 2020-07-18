const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Variation = new Schema({
  size: String,
  description: String,
  stock: Number,
  price: Number,
  discount: Number
});

module.exports = mongoose.model("Variation", Variation);
