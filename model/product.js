const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: String,
  company: {
    type: String,
    required: true,
  },
  price: Number,
  colors: [],
  description: String,
  url: [],
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  featured: {
    type: Boolean,
    requi: false,
  },
  shipping: Boolean,
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = { Product };
