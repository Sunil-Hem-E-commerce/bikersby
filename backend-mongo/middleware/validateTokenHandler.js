const jwt = require("jsonwebtoken");
const { User } = require("../model/user");
const secret = process.env.ACCESS_TOKEN_SECRET;
const refreshSecret = process.env.REFRESH_TOKEN_SECRET;

const validateHandler = async (req, res, next) => {
  try {
    let token;
    let authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return res.status(401).send({ message: "User is not authorized" });
    }

    token = authHeader.split(" ")[1];

    jwt.verify(token, secret, async (error, decoded) => {
      if (error) {
        if (error.name === "TokenExpiredError") {
          //! Extract userId from the expired token
          const { userId } = jwt.decode(token);
          const user = await User.findById(userId);
          if (!user || user.refreshToken !== token) {
            return res.status(401).send({ message: "Token has expired" });
          }

          //! Generate a new access token
          const newAccessToken = jwt.sign(
            { userId: user.id, username: user.username },
            secret,
            { expiresIn: "5m" },
          );

          //! Attach the new access token in the response headers
          res.set("Authorization", `Bearer ${newAccessToken}`);
          req.user = decoded;
          next();
        } else {
          return res.status(401).send({ message: "User is not authorized" });
        }
      }

      req.user = decoded;
      next();
    });
  } catch (error) {
    res.status(500).send({
      message: "Error in token validation middleware",
      error: error,
      success: false,
    });
  }
};

module.exports = validateHandler;
