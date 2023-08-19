const passwordMatchs = require("../middleware/password.middleware");
const User = require("../models/user.model");
const {
  generateRefreshToken,
  generateToken,
} = require("../middleware/generate.token.middleware");
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
        const refreshToken = await generateRefreshToken(user.id);
        await User.findByIdAndUpdate(
          user.id,
          {
            refreshToken: refreshToken,
          },
          { new: true }
        );
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          maxAge: 72 * 60 * 60 * 1000,
        });
        return res.status(201).json({ token: generateToken(user.id) });
      }
    } catch (error) {
      return res.status(403).json("Email or password not correct");
    }
  };
}

module.exports = AuthController;
