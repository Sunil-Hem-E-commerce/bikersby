const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const config = require("../utils/config");
const https = require("https");

module.exports = {
  async loginUser(req, res, next) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });

      const passwordCorrect =
        user === null
          ? false
          : await bcrypt.compare(password, user.passwordHash);

      if (!(user && passwordCorrect)) {
        return res.status(401).json({
          error: "invalid username or password",
        });
      }

      const userForToken = {
        email: user.email,
        id: user._id,
      };

      const token = jwt.sign(userForToken, process.env.SECRET, {
        expiresIn: config.JWT_EXPIRES_IN,
      });

      // res.cookie("token", token, {
      //   expires: new Date(Date.now() + 300000),
      //   httpOnly: true,
      //   // secure:true
      // });

      res.status(200).send({
        accessToken: token,
        fullName: user.fullName,
        email: user.email,
        user: { id: user._id },
        orders: user.orders,
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
              idToken
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
            }
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
      let user = await User.findOne({ email });
      if (!user) {
        const randomSecret = jwt.sign({ ts: Date.now() }, "social_secret");
        const passwordHash = await bcrypt.hash(randomSecret, 10);
        user = new User({
          username: name,
          email,
          passwordHash,
          phone: `+0000000000`,
          isEmailVerified: tokenInfo.email_verified === "true" || true,
        });
        await user.save();
      }
      const userForToken = { email: user.email, id: user._id };
      const token = jwt.sign(userForToken, process.env.SECRET, {
        expiresIn: config.JWT_EXPIRES_IN,
      });
      res.status(200).send({
        accessToken: token,
        email: user.email,
        user: { id: user._id },
        orders: user.orders,
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
              accessToken
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
            }
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
      let user = await User.findOne({ email });
      if (!user) {
        const randomSecret = jwt.sign({ ts: Date.now() }, "social_secret");
        const passwordHash = await bcrypt.hash(randomSecret, 10);
        user = new User({
          username: name,
          email,
          passwordHash,
          phone: `+0000000000`,
          isEmailVerified: true,
        });
        await user.save();
      }
      const userForToken = { email: user.email, id: user._id };
      const token = jwt.sign(userForToken, process.env.SECRET, {
        expiresIn: config.JWT_EXPIRES_IN,
      });
      res.status(200).send({
        accessToken: token,
        email: user.email,
        user: { id: user._id },
        orders: user.orders,
      });
    } catch (error) {
      next(error);
    }
  },
};
