require("dotenv").config();

const PORT = process.env.PORT;
const CLOUD_DB_URI = process.env.CLOUD_DB_URI;
const MONGODB_URI = process.env.MONGODB_URI;
const CLOUDINARY_NAME = process.env.CLOUDINARY_NAME;
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;
const CLOUDINARY_URL = process.env.CLOUDINARY_URL;
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN;
const CORS_ORIGINS = (process.env.CORS_ORIGINS || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "5m";

const mongoUrl =
  process.env.NODE_ENV === "production" && CLOUD_DB_URI
    ? CLOUD_DB_URI
    : MONGODB_URI;

module.exports = {
  mongoUrl,
  PORT,
  CLOUD_DB_URI,
  MONGODB_URI,
  CLOUDINARY_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_URL,
  FRONTEND_ORIGIN,
  CORS_ORIGINS,
  JWT_EXPIRES_IN,
};
