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
      if (user && (await user.isPasswordMatched(password))) {
        return res.status(201).json({
          token: generateToken(user._id),
        });
      } else {
        return res.status(403).json("Invalid Credentials");
      }
    } catch (error) {
      return res.status(403).json("Email or password not correct");
    }
  };
}

module.exports = AuthController;
