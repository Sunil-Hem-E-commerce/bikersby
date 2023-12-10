const User = require("../models/user");
const bcrypt = require("bcrypt");

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
};
