const express = require("express");
const UserController = require("../controllers/user.controller");
const router = express.Router();

router.get("/all", UserController.findAll);
router.get("/:id", UserController.findOne);
router.put("/:id", UserController.update);
router.delete("/:id", UserController.delete);

module.exports = router;
