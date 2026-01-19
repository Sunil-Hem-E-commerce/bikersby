const { initDb } = require("../utils/postgres");
const { products, images, colors } = require("../drizzle/schema");
const { eq } = require("drizzle-orm");

module.exports = {
  async list(req, res, next) {
    try {
      const db = await initDb();

      const rows = await db
        .select({
          id: products.id,
          name: products.name,
          company: products.company,
          price: products.price,
          discountedPrice: products.discountedPrice,
          description: products.description,
          category: products.category,
          featured: products.featured,
          stock: products.stock,
          reviews: products.reviews,
          stars: products.stars,
        })
        .from(products);

      const imageRows = await db
        .select({
          id: images.id,
          url: images.url,
          productId: images.productId,
        })
        .from(images);

      const colorRows = await db
        .select({
          id: colors.id,
          hex: colors.hex,
          productId: colors.productId,
        })
        .from(colors);

      const imageMap = new Map();
      for (const img of imageRows) {
        if (!imageMap.has(img.productId)) {
          imageMap.set(img.productId, []);
        }
        imageMap.get(img.productId).push(img.url);
      }

      const colorMap = new Map();
      for (const c of colorRows) {
        if (!colorMap.has(c.productId)) {
          colorMap.set(c.productId, []);
        }
        colorMap.get(c.productId).push(c.hex);
      }

      const flattenedProducts = rows.map((product) => {
        const productImages = imageMap.get(product.id) || [];
        const productColors = colorMap.get(product.id) || [];
        return {
          id: product.id,
          name: product.name,
          company: product.company,
          price: product.price,
          discountedPrice: product.discountedPrice,
          description: product.description,
          category: product.category,
          featured: product.featured,
          stock: product.stock,
          reviews: product.reviews,
          star: product.stars,
          image: productImages[0] || null,
          colors: productColors,
        };
      });
      res.set("Cache-Control", "public, max-age=60");
      res.json(flattenedProducts);
    } catch (error) {
      next(error);
    }
  },

  async listOne(req, res, next) {
    try {
      const db = await initDb();

      const id = Number(req.params.id);

      const productRows = await db
        .select()
        .from(products)
        .where(eq(products.id, id));

      if (productRows.length === 0) {
        return res.status(404).json({ error: "Product not found" });
      }

      const product = productRows[0];

      const productImages = await db
        .select()
        .from(images)
        .where(eq(images.productId, id));

      const productColors = await db
        .select()
        .from(colors)
        .where(eq(colors.productId, id));

      const response = {
        id: product.id,
        name: product.name,
        company: product.company,
        price: product.price,
        discountedPrice: product.discountedPrice,
        description: product.description,
        category: product.category,
        featured: product.featured,
        stock: product.stock,
        reviews: product.reviews,
        stars: product.stars,
        images: productImages,
        colors: productColors,
      };
      res.set("Cache-Control", "public, max-age=60");
      res.json(response);
    } catch (error) {
      next(error);
    }
  },
};
