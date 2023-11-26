const usersRouter = require("express").Router();
const bcrypt = require("bcrypt");
const db = require("../models");

const User = db.user;

usersRouter.get("/", async (req, res) => {
  const allUser = await User.findAll();
  res.status(200).json(allUser);
});

usersRouter.post("/", async (req, res) => {
  const { email, phone, userName, password } = req.body;

  if (password.length < 8) {
    return res.status(400).send("Password cannot be less then 8 characters");
  }

  const pwdHash = await bcrypt.hash(password, 13);

  const addUser = await User.create({
    email: email,
    phone: phone | null,
    userName: userName,
    pwdHash,
  });

  console.log("first", addUser instanceof User); // true
  console.log("second", addUser.name); // "Jane"
  console.log("third", addUser.toJSON()); // This is good!

  res.send(addUser.toJSON());
});

module.exports = usersRouter;
