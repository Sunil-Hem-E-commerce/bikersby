const mongoose = require("module");

const categorySchema = mongoose.schema({});

const Category = mongoose.model("Category", categorySchema);

module.exports = { Category };
