const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Product = new Schema({
  name: String,
  image: String,
  description: String,
  urlSlug: String,
  color: String,
  variations: [{
    type: Schema.Types.ObjectId,
    ref: "Variation"
  }]
 });

module.exports = mongoose.model("Product", Product)
