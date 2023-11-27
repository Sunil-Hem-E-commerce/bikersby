const jwt = require("jsonwebtoken");
const secret = process.env.ACCESS_TOKEN_SECRET;

const validateHandler = (req, res, next) => {
  try {
    let token;
    let authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return res.status(401).send({ message: "User is not authorized" });
    }

    token = authHeader.split(" ")[1];

    jwt.verify(token, secret, (error, decoded) => {
      if (error) {
        if (error.name === "TokenExpiredError") {
          return res.status(401).send({ message: "Token has expired" });
        } else {
          return res.status(401).send({ message: "User is not authorized" });
        }
      }

      //! Attach the decoded user information to the request for further use
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
