const User = require("../models/user.model");

class UserController {
  static findAll = async (req, res) => {
    try {
      const user = await User.find();
      return res.staus(200).json(user);
    } catch (error) {
      return res.status(500).json("Error to find all users");
    }
  };

  static findOne = async (req, res) => {
    try {
      const id = req.params;
      const user = await User.findOne({ id: id });
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
      const id = req.params;
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json(`Error to find a user with id ${id}`);
      }
      await User.findOneAndUpdate(
        id,
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

  static delete = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findOneAndDelete({ id: id });
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
}

module.exports = UserController;
