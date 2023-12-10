const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");

module.exports = {
  async loginUser(req, res, next) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });

      const passwordCorrect =
        user === null
          ? false
          : await bcrypt.compare(password, user.passwordHash);

      if (!(user && passwordCorrect)) {
        return res.status(401).json({
          error: "invalid username or password",
        });
      }

      const userForToken = {
        email: user.email,
        id: user._id,
      };

      const token = jwt.sign(userForToken, process.env.SECRET, {
        expiresIn: 60 * 5,
      });

      // res.cookie("token", token, {
      //   expires: new Date(Date.now() + 300000),
      //   httpOnly: true,
      //   // secure:true
      // });

      res.status(200).send({
        accessToken: token,
        fullName: user.fullName,
        email: user.email,
        user: { id: user._id },
        orders: user.orders,
      });
    } catch (error) {
      next(error);
    }
  },
};
