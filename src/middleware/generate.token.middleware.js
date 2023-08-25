const jwt = require("jsonwebtoken");
const processEnv = require("../env/envoriment");

const generateToken = (id, email, password) => {
  return jwt.sign({ id, email, password }, processEnv.JWT_SECRET, {
    expiresIn: "1h",
  });
};

const generateRefreshToken = (id, email, password) => {
  return jwt.sign({ id, email, password }, processEnv.JWT_SECRET, {
    expiresIn: "1h",
  });
};

module.exports = { generateToken, generateRefreshToken };
