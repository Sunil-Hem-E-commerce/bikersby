const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const loginRouter = require("express").Router();
const db = require("../models");

loginRouter.post("/", async (req, res) => {
  const { email, password } = req.body;

  const userQuery = await client.query(
    `select * from users where email = '${email}'`
  );

  const user = userQuery.rows[0];

  const passwordCorrect = user
    ? await bcrypt.compare(password, user.pwd_hash)
    : false;

  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: "invalid username or password",
    });
  }

  const userForToken = {
    username: user.full_name,
    id: user.id,
  };

  const token = jwt.sign(userForToken, process.env.SECRET, {
    expiresIn: 60 * 5,
  });

  res.status(200).send({
    token,
    fullName: user.full_name,
    email: user.email,
    id: user.id,
  });
});

module.exports = loginRouter;
