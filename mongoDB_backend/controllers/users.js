const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sendOtp } = require("../utils/otp");
const { sendVerificationEmail } = require("../utils/email");
const crypto = require("crypto");

module.exports = {
  async list(req, res, next) {
    try {
      const users = await User.find({}, null, { lean: true });
      res.set("Cache-Control", "private, max-age=30");
      res.json(users);
    } catch (error) {
      next(error);
    }
  },

  async addUser(req, res, next) {
    try {
      const { username, email, password, phone } = req.body;
      if (password.length < 4) {
        return res
          .status(400)
          .send("Password cannot be less then 4 characters");
      }
      const passwordHash = await bcrypt.hash(password, 10);
      const otp = await sendOtp(phone);
      const emailVerificationToken = crypto.randomBytes(20).toString("hex");

      const user = new User({
        username,
        email,
        passwordHash,
        phone,
        otp,
        emailVerificationToken,
      });

      const savedUser = await user.save();
      await sendVerificationEmail(email, emailVerificationToken);

      res.status(201).json(savedUser);
    } catch (error) {
      next(error);
    }
  },

  async verifyOtp(req, res, next) {
    try {
      const { phone, otp } = req.body;
      const user = await User.findOne({ phone, otp });

      if (!user) {
        return res.status(400).json({ error: "Invalid OTP" });
      }

      user.otp = null;
      await user.save();

      res.status(200).json({ message: "OTP verified successfully" });
    } catch (error) {
      next(error);
    }
  },

  async verifyEmail(req, res, next) {
    try {
      const { token } = req.query;
      const user = await User.findOne({ emailVerificationToken: token });

      if (!user) {
        return res.status(400).json({ error: "Invalid verification token" });
      }

      user.isEmailVerified = true;
      user.emailVerificationToken = null;
      await user.save();

      res.status(200).json({ message: "Email verified successfully" });
    } catch (error) {
      next(error);
    }
  },

  async listOne(req, res, next) {
    try {
      const user = await User.findById(req.params.id);
      res.json(user);
    } catch (error) {
      next(error);
    }
  },

  async deleteUser(req, res, next) {
    try {
      await User.findByIdAndRemove(req.params.id);
      res.status(204).end();
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
      const user = await User.findById(decodedToken.id);
      res.json(user);
    } catch (error) {
      next(error);
    }
  },
};
