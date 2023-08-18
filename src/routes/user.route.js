const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controller");

router.get("/all", UserController.findAll);
router.get("/:id", UserController.findOne);
router.put("/:id", UserController.update);
router.delete("/:id", UserController.delete);

module.exports = router;
