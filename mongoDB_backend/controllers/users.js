const usersRouter = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

usersRouter.get("/", async (req, res, next) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    next(error);
  }
});

usersRouter.post("/", async (req, res, next) => {
  try {
    const { fullName, email, password } = req.body;
    if (password.length < 4) {
      return res.status(400).send("Password cannot be less then 4 characters");
    }
    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
      fullName,
      email,
      passwordHash,
    });

    const savedUser = await user.save();

    res.status(201).json(savedUser);
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;
