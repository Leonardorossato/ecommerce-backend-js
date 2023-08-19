const bcrypt = require("bcrypt");
const User = require("../models/user.model");


const passwordMatchs = async function (enterPassword) {
  const password = User;
  return bcrypt.compare(password, enterPassword);
};

module.exports = passwordMatchs;
