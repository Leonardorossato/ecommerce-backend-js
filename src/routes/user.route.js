const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controller");
const {
  validateAuthToken,
  adminAuthToken,
  userAuthToken,
} = require("../middleware/jwt.middleware");

router.get(
  "/all-order",
  validateAuthToken,
  userAuthToken,
  UserController.getAllCarts
);

router.get(
  "/all-cart",
  validateAuthToken,
  userAuthToken,
  UserController.getAllCarts
);

//Get admin route
router.get("/all", validateAuthToken, adminAuthToken, UserController.findAll);
router.get("/:id", validateAuthToken, adminAuthToken, UserController.findOne);

//Post routes
router.post("/cash-order", validateAuthToken, UserController.createOrder);
router.post("/apply-cupom", validateAuthToken, UserController.applyCupom);
router.post("/forgot-password", UserController.forgotPassword);
router.post("/add-cart", validateAuthToken, userAuthToken, UserController.cart);

//Put routes
router.put(
  "/update-order/:id",
  validateAuthToken,
  adminAuthToken,
  UserController.updateOrderStatus
);
router.put("/reset-password/:token", UserController.resetPassword);
router.put("/address", validateAuthToken, UserController.saveAddress);
router.put("/password", validateAuthToken, UserController.updatePassword);
router.put("/:id", validateAuthToken, userAuthToken, UserController.update);
router.put(
  "/block/:id",
  validateAuthToken,
  adminAuthToken,
  UserController.blockUser
);
router.put(
  "/unblock/:id",
  validateAuthToken,
  adminAuthToken,
  UserController.unblockUser
);

//Delete route
router.delete(
  "/empty-cart",
  validateAuthToken,
  userAuthToken,
  UserController.emptyCart
);
router.delete("/:id", UserController.delete);

module.exports = router;
