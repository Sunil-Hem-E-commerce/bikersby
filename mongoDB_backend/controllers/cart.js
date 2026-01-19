const { initDb } = require("../utils/postgres");
const { cartItems } = require("../drizzle/schema");
const { and, eq } = require("drizzle-orm");

module.exports = {
  async addToCart(req, res, next) {
    try {
      const { qtyToAdd } = req.body;
      const productId = req.params.id;
      const userId = req.user.id;

      const db = await initDb();

      const existing = await db
        .select()
        .from(cartItems)
        .where(
          and(
            eq(cartItems.userId, userId),
            eq(cartItems.productId, Number(productId)),
          ),
        );

      if (existing.length > 0) {
        await db
          .update(cartItems)
          .set({ quantity: qtyToAdd })
          .where(eq(cartItems.id, existing[0].id));
        res.status(200).send("Updated the cart quantity");
      } else {
        await db.insert(cartItems).values({
          userId,
          productId: Number(productId),
          quantity: qtyToAdd,
          status: "cart",
        });
        res.status(200).send("Product added to cart");
      }
    } catch (error) {
      next(error);
    }
  },

  async inxCart(req, res, next) {
    try {
      const productId = req.params.id;
      const userId = req.user.id;

      const db = await initDb();

      const existing = await db
        .select()
        .from(cartItems)
        .where(
          and(
            eq(cartItems.userId, userId),
            eq(cartItems.productId, Number(productId)),
          ),
        );

      if (existing.length > 0) {
        await db
          .update(cartItems)
          .set({ quantity: existing[0].quantity + 1 })
          .where(eq(cartItems.id, existing[0].id));
        res.status(200).send("Increase the cart quantity");
      } else {
        await db.insert(cartItems).values({
          userId,
          productId: Number(productId),
          quantity: 1,
          status: "cart",
        });
        res.status(200).send("Product added to cart");
      }
    } catch (error) {
      next(error);
    }
  },

  async decCart(req, res, next) {
    try {
      const productId = req.params.id;
      const userId = req.user.id;

      const db = await initDb();

      const existing = await db
        .select()
        .from(cartItems)
        .where(
          and(
            eq(cartItems.userId, userId),
            eq(cartItems.productId, Number(productId)),
          ),
        );

      if (existing.length > 0) {
        const currentQty = existing[0].quantity;
        if (currentQty > 1) {
          await db
            .update(cartItems)
            .set({ quantity: currentQty - 1 })
            .where(eq(cartItems.id, existing[0].id));
          res.status(200).send("Decrease the cart quantity");
        } else {
          await db.delete(cartItems).where(eq(cartItems.id, existing[0].id));
          res.status(200).send("Product removed from cart");
        }
      } else {
        res.status(200).send("Add the product to the cart first");
      }
    } catch (error) {
      next(error);
    }
  },

  async updateCart(req, res, next) {
    try {
      const productId = req.params.id;
      const userId = req.user.id;

      const db = await initDb();

      await db
        .delete(cartItems)
        .where(
          and(
            eq(cartItems.userId, userId),
            eq(cartItems.productId, Number(productId)),
          ),
        );
      res.status(200).send("Product removed from cart");
    } catch (error) {
      next(error);
    }
  },

  async delCart(req, res, next) {
    try {
      const userId = req.user.id;

      const db = await initDb();

      await db.delete(cartItems).where(eq(cartItems.userId, userId));
      res.status(200).send("Cart has been emptied");
    } catch (error) {
      next(error);
    }
  },
};
