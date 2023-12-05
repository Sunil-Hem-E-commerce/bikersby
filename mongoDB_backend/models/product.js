const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, minLength: 5 },
  company: { type: String, minLength: 5 },
  price: { type: Number, min: 0 },
  discountedPrice: { type: Number, min: 0 },
  description: { type: String, minLength: 10 },
  category: { type: String, minLength: 5 },
  fetured: { type: Boolean, default: false },
  stock: { type: Number, min: 0 },
  rating: { type: Number, min: 0 },
  star: { type: Number, min: 0, max: 5 },
  colors: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Color",
    },
  ],
  images: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Image",
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

module.exports = mongoose.model("Comment", productSchema);
