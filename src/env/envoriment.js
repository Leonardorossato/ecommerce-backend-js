require("dotenv").config();
const APP_PORT = process.env.APP_PORT;
const MONGO_URL = process.env.MONGO_URL;
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = { APP_PORT, MONGO_URL, JWT_SECRET };
