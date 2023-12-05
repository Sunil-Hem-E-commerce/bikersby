const mongoose = require("mongoose");

const colorSchema = new mongoose.Schema({
  name: String,
  hex: String,
});

colorSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Color", colorSchema);
