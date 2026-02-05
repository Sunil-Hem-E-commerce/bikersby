const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("../utils/config");
const https = require("https");
const { initDb } = require("../utils/postgres");
const { users, cartItems } = require("../drizzle/schema");
const { eq } = require("drizzle-orm");

module.exports = {
  async loginUser(req, res, next) {
    try {
      const { email, password } = req.body;

      const db = await initDb();
      const rows = await db.select().from(users).where(eq(users.email, email));
      const user = rows[0];

      const passwordCorrect = !user
        ? false
        : await bcrypt.compare(password, user.passwordHash);

      if (!(user && passwordCorrect)) {
        return res.status(401).json({
          error: "invalid username or password",
        });
      }

      const userForToken = {
        email: user.email,
        id: user.id,
      };

      const token = jwt.sign(userForToken, process.env.SECRET, {
        expiresIn: config.JWT_EXPIRES_IN,
      });

      const cartRows = await db
        .select()
        .from(cartItems)
        .where(eq(cartItems.userId, user.id));

      res.status(200).send({
        accessToken: token,
        fullName: user.username,
        email: user.email,
        role: user.role,
        user: { id: user.id, role: user.role },
        orders: cartRows,
      });
    } catch (error) {
      next(error);
    }
  },

  async googleLogin(req, res, next) {
    try {
      const { idToken } = req.body;
      if (!idToken) {
        return res.status(400).json({ error: "idToken required" });
      }
      const tokenInfo = await new Promise((resolve, reject) => {
        https
          .get(
            `https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(
              idToken,
            )}`,
            (resp) => {
              let data = "";
              resp.on("data", (chunk) => (data += chunk));
              resp.on("end", () => {
                try {
                  resolve(JSON.parse(data));
                } catch (e) {
                  reject(e);
                }
              });
            },
          )
          .on("error", reject);
      });
      if (tokenInfo.error_description) {
        return res.status(400).json({ error: "Invalid Google token" });
      }
      if (
        process.env.GOOGLE_CLIENT_ID &&
        tokenInfo.aud !== process.env.GOOGLE_CLIENT_ID
      ) {
        return res.status(400).json({ error: "Token audience mismatch" });
      }
      const email = tokenInfo.email;
      const name = tokenInfo.name || tokenInfo.email;
      if (!email) {
        return res
          .status(400)
          .json({ error: "Email not available from Google" });
      }

      const randomSecret = jwt.sign({ ts: Date.now() }, "social_secret");
      const passwordHash = await bcrypt.hash(randomSecret, 10);
      const isEmailVerified = tokenInfo.email_verified === "true" || true;

      const db = await initDb();

      const [user] = await db
        .insert(users)
        .values({
          email,
          username: name,
          passwordHash,
          isEmailVerified,
          provider: "google",
          providerId: tokenInfo.sub || null,
        })
        .onConflictDoUpdate({
          target: users.email,
          set: {
            username: name,
            isEmailVerified,
            provider: "google",
            providerId: tokenInfo.sub || null,
          },
        })
        .returning();

      const userForToken = { email: user.email, id: user.id };
      const token = jwt.sign(userForToken, process.env.SECRET, {
        expiresIn: config.JWT_EXPIRES_IN,
      });

      const cartRows = await db
        .select()
        .from(cartItems)
        .where(eq(cartItems.userId, user.id));

      res.status(200).send({
        accessToken: token,
        email: user.email,
        user: { id: user.id },
        orders: cartRows,
      });
    } catch (error) {
      next(error);
    }
  },

  async facebookLogin(req, res, next) {
    try {
      const { accessToken } = req.body;
      if (!accessToken) {
        return res.status(400).json({ error: "accessToken required" });
      }
      const profile = await new Promise((resolve, reject) => {
        https
          .get(
            `https://graph.facebook.com/me?fields=id,name,email&access_token=${encodeURIComponent(
              accessToken,
            )}`,
            (resp) => {
              let data = "";
              resp.on("data", (chunk) => (data += chunk));
              resp.on("end", () => {
                try {
                  resolve(JSON.parse(data));
                } catch (e) {
                  reject(e);
                }
              });
            },
          )
          .on("error", reject);
      });
      if (profile.error) {
        return res
          .status(400)
          .json({ error: profile.error.message || "Invalid Facebook token" });
      }
      const email = profile.email;
      const name = profile.name || email || `fb_user_${profile.id}`;
      if (!email) {
        return res
          .status(400)
          .json({ error: "Email permission required from Facebook" });
      }

      const randomSecret = jwt.sign({ ts: Date.now() }, "social_secret");
      const passwordHash = await bcrypt.hash(randomSecret, 10);

      const db = await initDb();

      const [user] = await db
        .insert(users)
        .values({
          email,
          username: name,
          passwordHash,
          isEmailVerified: true,
          provider: "facebook",
          providerId: profile.id,
        })
        .onConflictDoUpdate({
          target: users.email,
          set: {
            username: name,
            isEmailVerified: true,
            provider: "facebook",
            providerId: profile.id,
          },
        })
        .returning();

      const userForToken = { email: user.email, id: user.id };
      const token = jwt.sign(userForToken, process.env.SECRET, {
        expiresIn: config.JWT_EXPIRES_IN,
      });

      const cartRows = await db
        .select()
        .from(cartItems)
        .where(eq(cartItems.userId, user.id));

      res.status(200).send({
        accessToken: token,
        email: user.email,
        user: { id: user.id },
        orders: cartRows,
      });
    } catch (error) {
      next(error);
    }
  },
};
