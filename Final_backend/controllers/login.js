const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const loginRouter = require("express").Router();
const db = require("../models");

const User = db.user;

loginRouter.post("/", async (req, res) => {
  const { email, password } = req.body;

  // const userQuery = await client.query(
  //   `select * from users where email = '${email}'`
  // );
  const user = await User.findOne({ where: { email: email } });
  if (user === null) {
    console.log("Not found!");
  } else {
    console.log("Found", user.dataValues);
    // console.log(project instanceof Project); // true
    // console.log(project.title); // 'My Title'
  }

  const passwordCorrect = user
    ? await bcrypt.compare(password, user.dataValues.pwdHash)
    : false;

  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: "invalid username or password",
    });
  }

  const userForToken = {
    username: user.dataValues.userName,
    id: user.userId,
  };

  const token = jwt.sign(userForToken, process.env.SECRET, {
    expiresIn: 60 * 5,
  });

  res.status(200).send({
    token,
    userName: user.dataValues.userName,
    email: user.dataValues.email,
    id: user.userId,
  });
});

module.exports = loginRouter;
