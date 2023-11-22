const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: String,
  company: String,
  price: Number,
  colors: [],
  description: String,
  url: [],
  category: String,
  featured: Boolean,
  shipping: Boolean,
});

const Product = mongoose.model("Product", productSchema);

module.exports = { Product };
