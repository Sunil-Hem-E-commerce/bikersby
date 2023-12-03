const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../models").User;

module.exports = {
  // tested
  async loginUser(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { user_email: email } });

    if (user === null) {
      res.status(400).send("User not found!!");
      console.log(" UserNot found!");
    } else {
      console.log("Found", user.dataValues);
    }

    const correctPwd = user
      ? await bcrypt.compare(password, user.dataValues.pwd_hash)
      : false;

    if (!(user && correctPwd)) {
      return res.status(401).json({
        error: "invalid username or password",
      });
    }

    const userForToken = {
      user_name: user.dataValues.user_name,
      id: user.userId,
    };

    const token = jwt.sign(userForToken, process.env.SECRET, {
      expiresIn: 60 * 5,
    });

    res.status(200).send({
      token,
      username: user.dataValues.user_name,
      email: user.dataValues.user_email,
      id: user.dataValues.id,
    });
  },
};
