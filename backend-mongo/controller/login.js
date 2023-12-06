const { User } = require("../model/user");
const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const validateTokenHandler = require("../middleware/validateTokenHandler");

const secret = process.env.ACCESS_TOKEN_SECRET;
const refreshSecret = process.env.REFRESH_TOKEN_SECRET;
const accessTokenExpiry = "5m";
const refreshTokenExpiry = "7d";

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send({ error: error });
  }
});

// router.post("/register", async (req, res, next) => {
//   try {
//     const { email, username, password } = req.body;
//     if (!username || !email || !password) {
//       return res.status(400).send({ message: "All fields are required" });
//     }

//     const userAvailable = await User.findOne({ email });
//     if (userAvailable) {
//       return res.status(400).send({ message: "User already registered" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const user = await new User({ username, email, password: hashedPassword });
//     await user.save();
//     res.send(user);
//   } catch (error) {
//     return res
//       .status(500)
//       .send({ message: "Error saving user", error: error, success: false });
//   }
// });

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
      return res.status(401).send({ message: "Wrong credentials !" });
    }

    const accessToken = jwt.sign(
      { userId: user.id, username: user.username },
      secret,
      { expiresIn: accessTokenExpiry },
    );

    //* To set token in Cookie
    res.cookie("jwt", token, {
      expires: new Date(Date.now() + 30000),
      httpOnly: true,
      // secure:true
    });

    console.log(`This is cookie: ${req.cookies.jwt}`);

    //* To set token in Cookie
    res.cookie("jwt", token, {
      expires: new Date(Date.now() + 30000),
      httpOnly: true,
      // secure:true
    });

    console.log(`This is cookie: ${req.cookies.jwt}`);

    const refreshToken = jwt.sign(
      { userId: user.id, username: user.username },
      refreshSecret,
      { expiresIn: refreshTokenExpiry },
    );

    user.refreshToken = refreshToken;
    await user.save();

    res.send({
      accessToken,
      refreshToken,
      user: { id: user.id, username: user.username, email: user.email },
    });
  } catch (error) {
    res.status(500).send({
      message: "Error logging in!",
      error: error,
      success: false,
    });
  }
});

router.get("/current", validateTokenHandler, (req, res) => {
  const currentUser = req.user;
  res.send({
    message: "Current user information",
    user: currentUser.username,
  });
});

module.exports = router;
