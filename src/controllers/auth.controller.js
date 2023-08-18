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
        throw new Error("Error in one of the user fields");
      }
    } catch (error) {
      throw new Error("User already registered.");
    }
  };

  static login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email: email });
      if (user && (await user.isPasswordMatched(password))) {
        return res.status(201).json(user);
      } else {
        throw new Error("Invalid Credentials");
      }
    } catch (error) {}
  };
}

module.exports = AuthController;
