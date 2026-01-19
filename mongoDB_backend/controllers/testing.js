const { initDb } = require("../utils/postgres");
const { cartItems, images, colors, products } = require("../drizzle/schema");

module.exports = {
  async deleteAllProduct(request, response, next) {
    try {
      const db = await initDb();
      await db.delete(cartItems);
      await db.delete(images);
      await db.delete(colors);
      await db.delete(products);
      response.status(204).end();
    } catch (error) {
      next(error);
    }
  },
};
