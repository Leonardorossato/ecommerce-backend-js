const jwt = require("jsonwebtoken");
const processEnv = require("../env/envoriment");
const User = require("../models/user.model");

const validateAuthToken = async (req, res, next) => {
  let token;
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
    try {
      if (token) {
        const decode = jwt.verify(token, processEnv.JWT_SECRET);
        const user = await User.findById(decode?.id);
        req.user = user;
        next();
      }
    } catch (error) {
      return res.status(403).send({
        message: "Not authorized, the token expired. Please login again",
      });
    }
  } else {
    return res
      .status(403)
      .send({ message: "There is no token attached to header" });
  }
};

const userAuthToken = async (req, res, next) => {
  try {
    const { email } = req.user;
    const user = await User.findOne({ email: email });
    if (user.role !== "user") {
      return res.status(403).json({ message: "You are not a User" });
    } else {
      next();
    }
  } catch (error) {
    return res.status(400).json({ message: "Error in token" });
  }
};

const adminAuthToken = async (req, res, next) => {
  try {
    const { email } = req.user;
    const adim = await User.findOne({ email: email });
    if (adim.role !== "admin") {
      return res.status(403).json({ message: "You are not a Admin" });
    } else {
      next();
    }
  } catch (error) {
    return res.status(400).json({ message: "Error in token" });
  }
};

module.exports = { validateAuthToken, adminAuthToken, userAuthToken };
