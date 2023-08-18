require("dotenv").config();
const processEnv = {
  APP_PORT: process.env.APP_PORT,
  MONGO_URL: process.env.MONGO_URL,
  JWT_SECRET: process.env.JWT_SECRET,
};

module.exports = processEnv;
