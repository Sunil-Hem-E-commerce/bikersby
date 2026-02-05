const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sendVerificationEmail } = require("../utils/email");
const crypto = require("crypto");
const { initDb } = require("../utils/postgres");
const { users } = require("../drizzle/schema");
const { eq } = require("drizzle-orm");

module.exports = {
  async list(req, res, next) {
    try {
      const db = await initDb();
      const result = await db.select().from(users);
      res.set("Cache-Control", "private, max-age=30");
      res.json(result);
    } catch (error) {
      next(error);
    }
  },

  async addUser(req, res, next) {
    try {
      const { username, email, password, role } = req.body;
      if (password.length < 4) {
        return res
          .status(400)
          .send("Password cannot be less then 4 characters");
      }
      const passwordHash = await bcrypt.hash(password, 10);
      const emailVerificationToken = crypto.randomBytes(20).toString("hex");

      const db = await initDb();

      // Determine role: Only admin can create non-user roles
      let userRole = "user";
      if (req.user && req.user.role === "admin" && role) {
        userRole = role;
      }

      const [savedUser] = await db
        .insert(users)
        .values({
          username,
          email,
          passwordHash,
          emailVerificationToken,
          isEmailVerified: false,
          provider: "local",
          role: userRole,
        })
        .returning();
      await sendVerificationEmail(email, emailVerificationToken);

      res.status(201).json(savedUser);
    } catch (error) {
      next(error);
    }
  },

  async verifyEmail(req, res, next) {
    try {
      const { token } = req.query;
      const db = await initDb();

      const [updated] = await db
        .update(users)
        .set({ isEmailVerified: true, emailVerificationToken: null })
        .where(eq(users.emailVerificationToken, token))
        .returning();

      if (!updated) {
        return res.status(400).json({ error: "Invalid verification token" });
      }

      res.status(200).json({ message: "Email verified successfully" });
    } catch (error) {
      next(error);
    }
  },

  async listOne(req, res, next) {
    try {
      const db = await initDb();
      const id = Number(req.params.id);
      const rows = await db.select().from(users).where(eq(users.id, id));
      res.json(rows[0] || null);
    } catch (error) {
      next(error);
    }
  },

  async deleteUser(req, res, next) {
    try {
      const db = await initDb();
      const id = Number(req.params.id);
      await db.delete(users).where(eq(users.id, id));
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  },

  async updateUser(req, res, next) {
    try {
      const id = Number(req.params.id);
      const { role, username, email } = req.body;
      const db = await initDb();
      
      const updateData = {};
      if (role) updateData.role = role;
      if (username) updateData.username = username;
      if (email) updateData.email = email;

      const [updated] = await db.update(users)
        .set(updateData)
        .where(eq(users.id, id))
        .returning();
      
      res.json(updated);
    } catch (error) {
      next(error);
    }
  },

  async userByToken(req, res, next) {
    try {
      const userToken = req.params.token;
      const decodedToken = jwt.verify(userToken, process.env.SECRET);
      if (!decodedToken.id) {
        return res.status(401).json({ error: "token invalid" });
      }
      const db = await initDb();
      const rows = await db
        .select()
        .from(users)
        .where(eq(users.id, decodedToken.id));
      res.json(rows[0] || null);
    } catch (error) {
      next(error);
    }
  },
};
