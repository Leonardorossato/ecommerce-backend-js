const processEnv = require("../env/envoriment");
const User = require("../models/user.model");
const crypto = require("crypto");
const uniqid = require("uniqid");
const sendEmail = require("./email.controller");
const validateId = require("../utils/validate.utils");
const Cart = require("../models/cart.model");
const Product = require("../models/product.model");
const Cupom = require("../models/cupom.model");
const Order = require("../models/order.model");
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

  static cart = async (req, res) => {
    try {
      const { cart } = req.body;
      const { _id } = req.user;
      validateId(_id);
      const user = await User.findById(_id);
      if (!user) {
        return res
          .status(404)
          .json({ message: `User with this id ${_id} not found` });
      }
      let products = [];
      const cartAlreadyExists = await Cart.findOne({ orderBy: user._id });
      if (cartAlreadyExists) {
        cartAlreadyExists.remove();
      }
      for (let i = 0; i < cart.length; i++) {
        let object = {};
        object.product = cart[i]._id;
        object.count = cart[i].count;
        object.color = cart[i].color;

        let getThisPrice = await Product.findById(cart[i]._id)
          .select("price")
          .exec();
        object.price = getThisPrice.price;
        products.push(object);
      }
      let cartTotal = 0;
      for (let i = 0; i < products.length; i++) {
        cartTotal = cartTotal + products[i].price * products[i].count;
      }
      let result = await new Cart({
        products,
        cartTotal,
        orderBy: user?._id,
      }).save();
      return res.status(200).json(result);
    } catch (error) {
      return res
        .status(400)
        .json({ message: "Error to add a product to this cart" });
    }
  };

  static getAllCarts = async (req, res) => {
    try {
      const { _id } = req.user;
      validateId(_id);
      const cart = await Cart.findOne({ orderBy: _id }).populate(
        "products.product",
        "_id title price totalAfterDiscount"
      );
      return res.status(200).json(cart);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error to find all products in cart" });
    }
  };

  static emptyCart = async (req, res) => {
    try {
      const { _id } = req.user;
      const user = await User.findById(_id);
      if (!user) {
        return res
          .status(404)
          .json({ message: `User with this id ${_id} not found` });
      }
      const cart = await Cart.findOneAndRemove({ orderBy: _id }).populate(
        "products.product"
      );
      return res.status(200).json(cart);
    } catch (error) {
      return res.status(400).json({ message: "Error in this operation." });
    }
  };

  static applyCupom = async (req, res) => {
    try {
      const { _id } = req.user;
      const { cupom } = req.body;
      const validCupom = await Cupom.findOne({ name: cupom });
      if (validCupom === null) {
        return res.status(403).json({ message: "Invalid cupom" });
      }
      const user = await User.findOne({ _id });
      let { cartTotal } = await Cart.findOne({
        orderBy: user._id,
      }).populate("products.product");
      let totalAfterDiscount =
        (cartTotal * validCupom.discount) / 100 - cartTotal.toFixed(2);
      await Cart.findOneAndUpdate(
        { orderBy: user._id },
        { totalAfterDiscount },
        { new: true }
      );
      return res.status(200).json(totalAfterDiscount);
    } catch (error) {
      return res
        .status(400)
        .json({ message: "Cupom cannot be applied because its invalid" });
    }
  };

  static createOrder = async (req, res) => {
    try {
      const { _id } = req.user;
      const { COD, cupomApplied } = req.body;
      if (!COD) {
        return res
          .status(400)
          .json({ message: "Error in create a cash order" });
      }
      const user = await User.findById(_id);
      const userCart = await Cart.findOne({ orderBy: user._id });
      let amount = 0;
      if (cupomApplied && userCart.totalAfterDiscount) {
        amount = userCart.totalAfterDiscount;
      } else {
        amount = userCart.cartTotal * 100;
      }
      let order = await new Order({
        products: userCart.products,
        payment: {
          id: uniqid(),
          method: "COD",
          amount: amount,
          status: "Cash on Delivery",
          created: Date.now(),
          currency: "USD",
        },
        orderBy: user._id,
        orderStatus: "Cash on Delivery",
      }).save();
      let update = await userCart.products.map((item) => {
        return {
          updateOne: {
            filter: { _id: item.product._id },
            update: { $inc: { quantity: -item.count, sold: +item.count } },
          },
        };
      });
      await Product.bulkWrite(update, {});
      return res.status(200).json({ message: "Success" });
    } catch (error) {
      return res.status(500).json({ message: "Error in create a order" });
    }
  };

  static getAllOrders = async (req, res) => {
    try {
      const { _id } = req.user;
      validateId(_id);
      const orders = await Order.findOne({ orderBy: _id });
      return res.status(200).json(orders);
    } catch (error) {
      return res.status(500).json({ message: "Error to find all users ordes" });
    }
  };

  static updateOrderStatus = async (req, res) => {
    try {
      const { status } = req.body;
      const { id } = req.params;
      validateId(id);
      const order = await Order.findByIdAndUpdate(
        id,
        { orderStatus: status, payment: { status: status } },
        { new: true }
      );
      return res.status(200).json(order);
    } catch (error) {
      return res.status(500).json({ message: "Error in update order" });
    }
  };
}

module.exports = UserController;
