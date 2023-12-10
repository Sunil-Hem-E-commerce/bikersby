const cloudinary = require("cloudinary").v2;
const config = require("./utils/config");

cloudinary.config({
  cloud_name: config.CLOUDINARY_NAME,
  api_key: config.CLOUDINARY_API_KEY,
  api_secret: config.CLOUDINARY_API_SECRET,
  secure: true,
});

module.exports = cloudinary;
