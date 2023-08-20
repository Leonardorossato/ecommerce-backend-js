require("dotenv").config();
const processEnv = {
  APP_PORT: process.env.APP_PORT,
  MONGO_URL: process.env.MONGO_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  NODEMAILER_HOST: process.env.NODEMAILER_HOST,
  NODEMAILER_PORT: process.env.NODEMAILER_PORT,
  NODEMAILER_USER: process.env.NODEMAILER_USER,
  NODEMAILER_PASSWORD: process.env.NODEMAILER_PASSWORD,
};

module.exports = processEnv;
