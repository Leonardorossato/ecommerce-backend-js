const jwt = require("jsonwebtoken");
const processEnv = require("../env/envoriment");
const User = require("../models/user.model");

const userAuthToken = async (req, res, next) => {
  let token;
  if (req?.headers?.authorization?.startswith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
    try {
      if (token) {
        const decode = jwt.verify(token, processEnv.JWT_SECRET);
        const user = await User.findById(decode?.id);
        request.user = user;
        next();
      }
    } catch (error) {
      return res
        .status(403)
        .send("Not authorized, the token expired. Please login again");
    }
  } else {
    return res.status(403).send("There is no token attached to header");
  }
};

const adminAuthToken = async (req, res, next) => {
  try {
    const { email } = req.user;
    const adim = await User.findOne({ email: email });
    if (adim.role !== "admin") {
      return res.status().json("You are not a Admin");
    } else {
      next();
    }
  } catch (error) {
    return res.status().json("Error in token");
  }
};

module.exports = { userAuthToken, adminAuthToken };
