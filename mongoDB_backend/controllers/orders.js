const { initDb } = require("../utils/postgres");
const {
  orders,
  orderItems,
  cartItems,
  products,
  images,
} = require("../drizzle/schema");
const { eq, desc, inArray, sql } = require("drizzle-orm");

module.exports = {
  async createOrder(req, res, next) {
    try {
      const userId = req.user.id;
      const { shippingAddress, contactNumber, paymentMethod } = req.body;

      const db = await initDb();

      // 1. Get cart items with product details
      const userCart = await db
        .select({
          cartId: cartItems.id,
          productId: cartItems.productId,
          quantity: cartItems.quantity,
          productName: products.name,
          productPrice: products.price,
          productDiscounted: products.discountedPrice,
          productStock: products.stock,
        })
        .from(cartItems)
        .leftJoin(products, eq(cartItems.productId, products.id))
        .where(eq(cartItems.userId, userId));

      if (userCart.length === 0) {
        return res.status(400).json({ error: "Cart is empty" });
      }

      // Check Stock
      for (const item of userCart) {
        if (item.productStock < item.quantity) {
          return res
            .status(400)
            .json({ error: `Not enough stock for ${item.productName}` });
        }
      }

      // Fetch images for these products
      const productIds = userCart.map((i) => i.productId);
      const productImages = await db
        .select()
        .from(images)
        .where(inArray(images.productId, productIds));

      const imageMap = {};
      productImages.forEach((img) => {
        if (!imageMap[img.productId]) {
          imageMap[img.productId] = img.url;
        }
      });

      // Calculate total
      let totalAmount = 0;
      const orderItemsData = [];

      for (const item of userCart) {
        const price = item.productDiscounted || item.productPrice;
        totalAmount += price * item.quantity;
        orderItemsData.push({
          productId: item.productId,
          name: item.productName,
          price: price,
          quantity: item.quantity,
          image: imageMap[item.productId] || null,
          color: "default",
        });
      }

      // Create Order
      const [newOrder] = await db
        .insert(orders)
        .values({
          userId,
          amount: totalAmount,
          status: "pending",
          paymentStatus: "pending",
          paymentMethod: paymentMethod || "cod",
          shippingAddress,
          contactNumber,
        })
        .returning();

      // Create Order Items and Update Stock
      for (const item of orderItemsData) {
        await db.insert(orderItems).values({
          orderId: newOrder.id,
          ...item,
        });

        // Decrement Stock
        await db
          .update(products)
          .set({
            stock: sql`${products.stock} - ${item.quantity}`,
            updatedAt: new Date(),
          })
          .where(eq(products.id, item.productId));
      }

      // Clear Cart
      await db.delete(cartItems).where(eq(cartItems.userId, userId));

      // Send Confirmation Email (Async)
      sendOrderConfirmationEmail(req.user.email, newOrder).catch(console.error);

      res.status(201).json(newOrder);
    } catch (error) {
      next(error);
    }
  },

  async getMyOrders(req, res, next) {
    try {
      const userId = req.user.id;
      const db = await initDb();

      const userOrders = await db
        .select()
        .from(orders)
        .where(eq(orders.userId, userId))
        .orderBy(desc(orders.createdAt));

      res.json(userOrders);
    } catch (error) {
      next(error);
    }
  },

  async getOrderDetails(req, res, next) {
    try {
      const { id } = req.params;
      const userId = req.user.id;
      const isAdmin = req.user.role === "admin";

      const db = await initDb();
      const [order] = await db.select().from(orders).where(eq(orders.id, id));

      if (!order) return res.status(404).json({ error: "Order not found" });

      if (order.userId !== userId && !isAdmin) {
        return res.status(403).json({ error: "Unauthorized" });
      }

      const items = await db
        .select()
        .from(orderItems)
        .where(eq(orderItems.orderId, id));

      res.json({ ...order, items });
    } catch (error) {
      next(error);
    }
  },

  async getAllOrders(req, res, next) {
    try {
      const db = await initDb();
      const allOrders = await db
        .select()
        .from(orders)
        .orderBy(desc(orders.createdAt));
      res.json(allOrders);
    } catch (error) {
      next(error);
    }
  },

  async updateOrderStatus(req, res, next) {
    try {
      const { id } = req.params;
      const { status, paymentStatus } = req.body;
      const db = await initDb();

      const updateData = {};
      if (status) updateData.status = status;
      if (paymentStatus) updateData.paymentStatus = paymentStatus;

      const [updated] = await db
        .update(orders)
        .set(updateData)
        .where(eq(orders.id, id))
        .returning();

      res.json(updated);
    } catch (error) {
      next(error);
    }
  },
};
