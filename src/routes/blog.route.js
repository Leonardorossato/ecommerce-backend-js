const express = require("express");
const BlogController = require("../controllers/blog.controller");
const router = express.Router();

router.get("/all", BlogController.findAll);
router.post("create", BlogController.create);

module.exports = router;
