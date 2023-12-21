const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  async list(req, res, next) {
    try {
      const users = await User.find({});
      res.json(users);
    } catch (error) {
      next(error);
    }
  },

  async addUser(req, res, next) {
    try {
      const { username, email, password } = req.body;
      if (password.length < 4) {
        return res
          .status(400)
          .send("Password cannot be less then 4 characters");
      }
      const passwordHash = await bcrypt.hash(password, 10);

      const user = new User({
        username,
        email,
        passwordHash,
      });

      const savedUser = await user.save();

      res.status(201).json(savedUser);
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
      console.log("userToken", userToken);
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
