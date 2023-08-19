const jwt = require("jsonwebtoken");
const processEnv = require("../env/envoriment");

const generateToken = (id) => {
  return jwt.sign({ id }, processEnv.JWT_SECRET, { expiresIn: "1d" });
};

const generateRefreshToken = (id) => {
  return jwt.sign({ id }, processEnv.JWT_SECRET, { expiresIn: "2d" });
};

module.exports = { generateToken, generateRefreshToken };
