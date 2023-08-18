const User = require("../models/user.model");

class AuthController {
  static register = async (req, res) => {
    try {
      const email = req.body.email;
      const user = await User.findOne({ email: email });
      if (!user) {
        const newUser = await User.create(req.body);
        await newUser.save();
        return newUser;
      } else {
        throw new Error("Error in one of the user fields");
      }
    } catch (error) {
      throw new Error("User already registered.");
    }
  };
}

module.exports = AuthController;
