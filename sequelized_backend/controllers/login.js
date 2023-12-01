const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../models").User;

module.exports = {
  async loginUser(req, res) {
    const { user_email, password } = req.body;
    console.log("here");
    const user = await User.findOne({ where: { user_email } });

    if (user === null) {
      console.log(" UserNot found!");
    } else {
      console.log("Found", user.dataValues);
    }

    console.log("console here::", user.dataValues);
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
      user_name: user.dataValues.user_name,
      user_email: user.dataValues.user_email,
      id: user.dataValues.id,
    });
  },
};
