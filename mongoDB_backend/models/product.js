const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const productSchema = new mongoose.Schema({
  name: { type: String, minLength: 5, unique: true },
  company: { type: String, minLength: 3 },
  price: { type: Number, min: 0 },
  discountedPrice: { type: Number, min: 0 },
  description: { type: String, minLength: 10 },
  category: { type: String, minLength: 3 },
  featured: { type: Boolean, default: false },
  stock: { type: Number, min: 0 },
  reviews: { type: Number, min: 0 },
  stars: { type: Number, min: 0, max: 5 },
  images: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Image",
    },
  ],
  colors: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Color",
    },
  ],
});

productSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

productSchema.plugin(uniqueValidator);
module.exports = mongoose.model("Product", productSchema);
