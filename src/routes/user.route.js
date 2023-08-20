const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controller");
const {
  validateAuthToken,
  adminAuthToken,
  userAuthToken,
} = require("../middleware/jwt.middleware");

router.get("/all", validateAuthToken, adminAuthToken, UserController.findAll);
router.post("/forgot-password", UserController.forgotPassword);

router.get("/:id", validateAuthToken, adminAuthToken, UserController.findOne);
router.put(
  "/reset-password/:token",
  UserController.resetPassword
);
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
router.delete("/:id", UserController.delete);

module.exports = router;
