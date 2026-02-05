const { tokenExtractor, userExtractor } = require("../utils/middleware");
const cloudinary = require("../script");
const { initDb } = require("../utils/postgres");
const { products, colors, images } = require("../drizzle/schema");
const { eq } = require("drizzle-orm");

module.exports = {
  async addProduct(req, res, next) {
    try {
      const {
        name,
        company,
        price,
        discountedPrice,
        description,
        category,
        featured,
        stock,
        reviews,
        stars,
        hex,
        colors: colorsInput,
        imageUrl,
      } = req.body;

      const db = await initDb();

      const normalizedStars =
        typeof stars === "number" ? Math.round(stars) : undefined;

      const parsedPrice = Number(price);
      const parsedStock = Number(stock || 0);
      const parsedFeatured = featured === "true" || featured === true;

      const [savedProduct] = await db
        .insert(products)
        .values({
          name,
          company,
          price: parsedPrice,
          discountedPrice,
          description,
          category,
          featured: parsedFeatured,
          stock: parsedStock,
          reviews,
          stars: normalizedStars,
        })
        .returning();

      if (hex) {
        await db.insert(colors).values({ hex, productId: savedProduct.id });
      } else if (colorsInput) {
        const colorsList = Array.isArray(colorsInput)
          ? colorsInput
          : [colorsInput];
        for (const c of colorsList) {
          await db
            .insert(colors)
            .values({ hex: c, productId: savedProduct.id });
        }
      }

      if (req.files && req.files.image) {
        const sentFile = req.files.image;
        cloudinary.uploader.upload(
          sentFile.tempFilePath,
          async (err, result) => {
            if (err) {
              next(err);
            } else {
              try {
                const img = result.url;
                await db
                  .insert(images)
                  .values({ url: img, productId: savedProduct.id });
                res.status(201).send("Product created with image sucessufully");
              } catch (error) {
                next(error);
              }
            }
          },
        );
      } else if (imageUrl) {
        await db
          .insert(images)
          .values({ url: imageUrl, productId: savedProduct.id });
        res.status(201).send("Product created successfully");
      } else {
        res.status(201).send("Product created successfully");
      }
    } catch (error) {
      next(error);
    }
  },

  async updateProduct(req, res, next) {
    try {
      const db = await initDb();
      const id = Number(req.params.id);

      const {
        name,
        company,
        price,
        discountedPrice,
        description,
        category,
        featured,
        stock,
        stars,
        colors: colorsList,
        imageUrl,
      } = req.body;

      const normalizedStars =
        typeof stars === "number" ? Math.round(stars) : undefined;

      const parsedPrice = Number(price);
      const parsedStock = Number(stock || 0);
      const parsedFeatured = featured === "true" || featured === true;

      // Update product table
      const [updated] = await db
        .update(products)
        .set({
          name,
          company,
          price: parsedPrice,
          discountedPrice,
          description,
          category,
          featured: parsedFeatured,
          stock: parsedStock,
          stars: normalizedStars,
          updatedAt: new Date(),
        })
        .where(eq(products.id, id))
        .returning();

      if (!updated) {
        res.status(404).json({ message: "Product not found" });
        return;
      }

      // Update Colors (Delete old, insert new)
      if (colorsList && Array.isArray(colorsList)) {
        await db.delete(colors).where(eq(colors.productId, id));
        for (const c of colorsList) {
          await db.insert(colors).values({ hex: c, productId: id });
        }
      }

      // Update Image if provided
      if (req.files && req.files.image) {
        const sentFile = req.files.image;
        cloudinary.uploader.upload(
          sentFile.tempFilePath,
          async (err, result) => {
            if (err) {
              console.error("Cloudinary error", err);
            } else {
              const img = result.url;
              await db.delete(images).where(eq(images.productId, id));
              await db.insert(images).values({ url: img, productId: id });
            }
          },
        );
      } else if (imageUrl) {
        await db.delete(images).where(eq(images.productId, id));
        await db.insert(images).values({ url: imageUrl, productId: id });
      }

      res
        .status(200)
        .json({ message: "Product updated successfully", product: updated });
    } catch (error) {
      next(error);
    }
  },

  async addBulkProducts(req, res, next) {
    try {
      const { products: productsList = [], defaultDiscountPercent } =
        req.body || {};
      if (!Array.isArray(productsList) || productsList.length === 0) {
        return res.status(400).json({ message: "products array is required" });
      }
      const db = await initDb();
      const results = [];
      for (const p of productsList) {
        try {
          const {
            name,
            company,
            price,
            discountedPrice,
            description,
            category,
            featured = false,
            stock = 50,
            reviews = 0,
            stars = 4.5,
            colors: colorsInput = [],
            imageUrl,
          } = p;

          const normalizedPrice =
            typeof price === "number" ? price : Math.round(Number(price) * 100);
          const hasDiscount =
            typeof discountedPrice === "number" || defaultDiscountPercent;
          const computedDiscount =
            typeof discountedPrice === "number"
              ? discountedPrice
              : Math.round(
                  normalizedPrice *
                    (1 - (Number(defaultDiscountPercent) || 0) / 100),
                );

          const normalizedStars =
            typeof stars === "number" ? Math.round(stars) : undefined;

          const [savedProduct] = await db
            .insert(products)
            .values({
              name,
              company,
              price: normalizedPrice,
              discountedPrice: hasDiscount ? computedDiscount : undefined,
              description,
              category,
              featured,
              stock,
              reviews,
              stars: normalizedStars,
            })
            .returning();

          if (Array.isArray(colorsInput)) {
            for (const c of colorsInput) {
              await db
                .insert(colors)
                .values({ hex: c, productId: savedProduct.id });
            }
          }

          if (imageUrl) {
            await db
              .insert(images)
              .values({ url: imageUrl, productId: savedProduct.id });
          }

          results.push({
            ok: true,
            id: savedProduct.id,
            name: savedProduct.name,
          });
        } catch (e) {
          results.push({ ok: false, error: e.message, name: p?.name });
        }
      }
      res.status(201).json({ message: "Bulk insert processed", results });
    } catch (error) {
      next(error);
    }
  },

  async deleteProduct(req, res, next) {
    try {
      const db = await initDb();
      const id = Number(req.params.id);

      const [deleted] = await db
        .delete(products)
        .where(eq(products.id, id))
        .returning();

      if (!deleted) {
        res.status(404).json({ message: "Product not found" });
        return;
      }

      res
        .status(200)
        .json({ message: "Product deleted successfully", product: deleted });
    } catch (error) {
      next(error);
    }
  },
};
