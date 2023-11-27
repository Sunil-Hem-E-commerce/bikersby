require("dotenv").config();

const api = process.env.API_URL;

const url = process.env.MONGODB_URI;
const PORT = process.env.PORT || 3000;

module.exports = { PORT, url, api };
