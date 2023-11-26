const usersRouter = require("express").Router();
const bcrypt = require("bcrypt");
const db = require("../models");

const User = db.user;

usersRouter.get("/", async (req, res) => {
  const allUser = await User.findAll({
    attributes: { exclude: ["updatedAt"] },
  });
  res.status(200).json(allUser);
});

usersRouter.post("/", async (req, res) => {
  const { email, phone, fullName, password } = req.body;

  if (password.length < 8) {
    return res.status(400).send("Password cannot be less then 8 characters");
  }

  const pwdHash = await bcrypt.hash(password, 13);

  const addUser = await User.create({
    email: email,
    phone: phone | null,
    userName: fullName,
    pwdHash,
  });

  // const result = await addUser.save();

  console.log("RESULT:: ", addUser);

  res.send(addUser.toJSON());
});

module.exports = usersRouter;
