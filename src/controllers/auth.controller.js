const generateToken = require("../middleware/generate.token.middleware");
const passwordMatchs = require("../middleware/password.middleware");
const User = require("../models/user.model");

class AuthController {
  static register = async (req, res) => {
    try {
      const email = req.body.email;
      const user = await User.findOne({ email: email });
      if (!user) {
        const newUser = await User.create(req.body);
        await newUser.save();
        return res.status(201).json(newUser);
      } else {
        return res.status(403).json("Error in one of the user fields");
      }
    } catch (error) {
      return res.status(403).json("User already registered.");
    }
  };

  static login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email: email });
      if (!user && !passwordMatchs(password)) {
        return res.status(403).json("Invalid Credentials");
      } else {
        let token = generateToken(user.id);
        return res.status(201).json({ token: token });
      }
    } catch (error) {
      return res.status(403).json("Email or password not correct");
    }
  };
}

module.exports = AuthController;
