const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/auth.controller");

router.post("/login", AuthController.login);
router.get("/refresh", AuthController.handleRefreshToken);
router.get("/logout", AuthController.logOut);
router.post("/register", AuthController.register);

module.exports = router;
