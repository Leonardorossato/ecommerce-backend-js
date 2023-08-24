const processEnv = require("../env/envoriment");
const User = require("../models/user.model");
const crypto = require("crypto");
const sendEmail = require("./email.controller");
const validateId = require("../utils/validate.utils");
class UserController {
  static findAll = async (req, res) => {
    try {
      const user = await User.find();
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json("Error to find all users");
    }
  };

  static findOne = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json(`Error to find a user with id ${id}`);
      }
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json("User with this id not exists.");
    }
  };

  static update = async (req, res) => {
    try {
      const { _id } = req.user;
      validateId(_id);
      const user = await User.findById(_id);
      if (!user) {
        return res.status(404).json(`Error to find a user with id ${id}`);
      }
      await User.findByIdAndUpdate(
        _id,
        {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          mobile: req.body.mobile,
        },
        { new: true }
      );
      return res.status(200).json({ message: "User updated successfuly." });
    } catch (error) {
      return res.status(500).json({ message: "Error updating user" });
    }
  };

  static updatePassword = async (req, res) => {
    try {
      const { _id } = req.user;
      const { password } = req.body;
      validateId(_id);
      const user = await User.findById(_id);
      if (password) {
        user.password = password;
        const updatePassword = await user.save();
        return res.status(200).json(updatePassword);
      } else {
        return res.status(404).json({ message: user });
      }
    } catch (error) {
      return res.status(400).json({ message: "Error in update user password" });
    }
  };

  static forgotPassword = async (req, res) => {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email: email });
      if (!user) {
        return res
          .status(404)
          .json({ message: "User not found with this email" });
      }
      const token = await user.createPasswordResetToken();
      await user.save();
      const url = `Hi, Please follow this link to reset your password. This is valid for 10 minutes. <a href="http://localhost:${processEnv.APP_PORT}/api/users/reset-password/${token}">Click here</a>`;
      const data = {
        to: email,
        text: "Hey User",
        subject: "Forgot Password Link",
        html: url,
      };
      sendEmail(data);
      return res.status(200).json(token);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error to send reset password token" });
    }
  };

  static resetPassword = async (req, res) => {
    const { password } = req.body;
    const { token } = req.params;
    const hashToken = crypto.createHash("sha256").update(token).digest("hex");
    const user = await User.findOne({
      passwordResetToken: hashToken,
      passwordResetExpires: { $gt: Date.now() },
    });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Token Expired, Please try again later" });
    }
    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
    return res.status(200).json(user);
  };

  static delete = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findByIdAndDelete(id);
      if (!user) {
        return res.status(404).json(`Error to find a user with id ${id}`);
      }
      return res.status(200).json({ message: "User deleted successfully." });
    } catch (error) {
      return res
        .status(500)
        .json({ message: `Error deleting user with id ${id}` });
    }
  };

  static blockUser = async (req, res) => {
    try {
      const { id } = req.params;
      await User.findByIdAndUpdate(
        id,
        {
          isBlocked: true,
        },
        { new: true }
      );
      return res.status(200).json({ message: "User block successfully." });
    } catch (error) {
      return res.status(500).json({ message: "Error in block this user." });
    }
  };

  static unblockUser = async (req, res) => {
    try {
      const { id } = req.params;
      await User.findByIdAndUpdate(
        id,
        {
          isBlocked: false,
        },
        { new: true }
      );
      return res.status(200).json({ message: "User unblocked successfully." });
    } catch (error) {
      return res
        .status(500)
        .json({ message: `Error unblocking user with id ${id}` });
    }
  };

  static getWishList = async (req, res) => {
    try {
      const { _id } = req.user;
      const user = await User.findById(_id).populate("whihsList");
      if (!user) {
        return res
          .status(404)
          .json({ message: `User with this id ${_id} not found` });
      }
      return res.status(200).json(user);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error to find a User with wish list." });
    }
  };

  static saveAddress = async (req, res) => {
    try {
      const { _id } = req.user;
      const user = await User.findById(_id);
      if (!user) {
        return res
          .status(404)
          .json({ message: `User with this id ${_id} not found` });
      }
      const address = await User.findByIdAndUpdate(
        _id,
        { address: req.body.address },
        { new: true }
      );
      return res.status(200).json(address);
    } catch (error) {
      return res.status(400).json({ message: "Address error or not found." });
    }
  };
}

module.exports = UserController;
