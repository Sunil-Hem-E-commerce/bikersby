import { pgTable, serial, text, boolean, integer, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  username: text("username"),
  passwordHash: text("password_hash"),
  address: text("address"),
  isEmailVerified: boolean("is_email_verified").default(false),
  emailVerificationToken: text("email_verification_token"),
  provider: text("provider"),
  providerId: text("provider_id"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  company: text("company"),
  price: integer("price").notNull(),
  discountedPrice: integer("discounted_price"),
  description: text("description"),
  category: text("category"),
  featured: boolean("featured").default(false),
  stock: integer("stock").default(0),
  reviews: integer("reviews").default(0),
  stars: integer("stars").default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

export const images = pgTable("images", {
  id: serial("id").primaryKey(),
  url: text("url").notNull().unique(),
  width: integer("width").default(1080),
  height: integer("height").default(650),
  size: integer("size").default(1080),
  type: text("type").default("image/png"),
  productId: integer("product_id")
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),
});

export const colors = pgTable("colors", {
  id: serial("id").primaryKey(),
  hex: text("hex").notNull(),
  productId: integer("product_id")
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),
});

export const cartItems = pgTable("cart_items", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  productId: integer("product_id").notNull(),
  quantity: integer("quantity").notNull().default(1),
  status: text("status").default("cart"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

