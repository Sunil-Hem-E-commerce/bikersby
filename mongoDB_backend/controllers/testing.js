const Product = require("../models/product");

module.exports = {
  async deleteAllProduct(request, response) {
    await Product.deleteMany({});
    // await User.deleteMany({});

    response.status(204).end();
  },
};
