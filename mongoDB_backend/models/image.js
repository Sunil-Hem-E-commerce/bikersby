const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const imageSchema = new mongoose.Schema({
  width: { type: Number, default: 1080 },
  height: { type: Number, default: 650 },
  url: { type: String, minLength: 4, unique: true },
  size: { type: Number, default: 1080 },
  type: { type: String, default: "image/png" },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
});

imageSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    // returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});

imageSchema.plugin(uniqueValidator);
module.exports = mongoose.model("Image", imageSchema);
