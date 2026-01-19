const logger = require("./logger");
const { initDb } = require("./postgres");
const { users } = require("../drizzle/schema");
const { eq } = require("drizzle-orm");
const jwt = require("jsonwebtoken");
const path = require("path");

const tokenExtractor = (request, response, next) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    request.token = authorization.replace("Bearer ", "");
    return next();
  }
  request.token = null;
  return next();
};

const userExtractor = async (request, response, next) => {
  try {
    if (request.token) {
      const decodedToken = jwt.verify(request.token, process.env.SECRET);
      if (!decodedToken.id) {
        return res.status(401).json({ error: "token invalid" });
      }

      const db = await initDb();
      const rows = await db
        .select()
        .from(users)
        .where(eq(users.id, decodedToken.id));
      request.user = rows[0] || null;
      return next();
    }
    request.user = null;
    return next();
  } catch (error) {
    next(error);
  }
};

const unknownEndpoint = (request, response) => {
  response.sendFile(path.resolve(__dirname, "../dist/index.html")); // response.status(404).send({ error: "unknown endpoint" });
};

const requireAuth = (request, response, next) => {
  if (!request.user) {
    return response.status(401).json({ error: "authentication required" });
  }
  return next();
};

const errorHandler = (error, request, response, next) => {
  logger.info("---------");
  logger.error(error.message);

  if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(401).json({ error: error.message });
  } else if (error.name === "TokenExpiredError") {
    return response.status(401).json({
      error: "token expired",
    });
  }

  next(error);
};

module.exports = {
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor,
  requireAuth,
};
