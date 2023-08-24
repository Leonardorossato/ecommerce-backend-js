const passwordMatchs = require("../middleware/password.middleware");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const {
  generateRefreshToken,
  generateToken,
} = require("../middleware/generate.token.middleware");
const processEnv = require("../env/envoriment");
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
      if (!user && (await user.isPasswordMatched(password))) {
        return res.status(403).json("Invalid Credentials");
      } else {
        const refreshToken = await generateRefreshToken(user._id);
        await User.findByIdAndUpdate(
          user._id,
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

  static loginAdmin = async (req, res) => {
    try {
      const { email, password } = req.body;
      const admin = await User.findOne({ email: email });
      if (admin.role !== "admin") {
        return res.status(401).json({ message: "Not authorized." });
      }
      if (!admin && (await admin.isPasswordMatched(password))) {
        return res.status(403).json("Invalid Credentials");
      } else {
        const refreshToken = await generateRefreshToken(admin._id);
        await User.findByIdAndUpdate(
          admin._id,
          {
            refreshToken: refreshToken,
          },
          { new: true }
        );
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          maxAge: 72 * 60 * 60 * 1000,
        });
        return res.status(201).json({ token: generateToken(admin._id) });
      }
    } catch (error) {
      return res.status(403).json("Email or password not correct");
    }
  };

  static handleRefreshToken = async (req, res) => {
    try {
      const cookie = req.cookies;
      if (!cookie?.refreshToken) {
        return res.status(403).json("No refresh token in cookie");
      }
      const refreshToken = cookie.refreshToken;
      const user = await User.findOne({ refreshToken });
      if (!user) {
        return res
          .status(403)
          .json("No refreshToken present in mongoose Database");
      }
      jwt.verify(refreshToken, processEnv.JWT_SECRET, (err, decode) => {
        if (err || user.id !== decode.id) {
          return res
            .status(403)
            .json("There is something wrong with refresh token");
        }
        const accessToken = generateToken(user.id);
        return res.status(200).json({ accessToken: accessToken });
      });
    } catch (error) {
      return res
        .status(401)
        .json({ message: "Error generating access token: " });
    }
  };

  static logOut = async (req, res) => {
    try {
      const cookie = req.cookies;
      if (!cookie?.refreshToken) {
        return res.status(404).json({ message: "No Refresh Token in Cookie" });
      }
      const refreshToken = cookie.refreshToken;
      const user = await User.findOne({ refreshToken });
      if (!user) {
        res.clearCookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: true,
        });
        return res.status(204).json({ message: "Forbidden" });
      }
      await User.findOneAndUpdate(
        { refreshToken: refreshToken },
        {
          refreshToken: "",
        }
      );
      res.clearCookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
      });
      return res.status(200).json({ message: "Logout successfuly." });
    } catch (error) {
      return res.status(500).json({ message: "Error: " + error.message });
    }
  };
}

module.exports = AuthController;
