const { User } = require("../model/user");
const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const validateTokenHandler = require("../middleware/validateTokenHandler");

const secret = process.env.ACCESS_TOKEN_SECRET;
const refreshSecret = process.env.REFRESH_TOKEN_SECRET;

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send({ message: "Provide email and password" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).send({ message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).send({ message: "Wrong credentials!" });
    }

    const accessToken = jwt.sign(
      { userId: user.id, email: user.email },
      secret,
      { expiresIn: "1hr" },
    );

    const refreshToken = jwt.sign(
      { userId: user.id, email: user.email },
      refreshSecret,
      { expiresIn: "7d" },
    );

    user.refreshToken = refreshToken;
    await user.save();

    res.send({
      accessToken,
      refreshToken,
      user: { id: user.id, email: user.email },
    });
  } catch (error) {
    console.error("Error logging in:", error); // Log the specific error for debugging purposes
    res.status(500).send({
      message: "Error logging in!",
      error: error.message, // Sending the error message for a better understanding of the issue
      success: false,
    });
  }
});

module.exports = router;
