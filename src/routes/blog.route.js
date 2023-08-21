const express = require("express");
const BlogController = require("../controllers/blog.controller");
const {
  validateAuthToken,
  adminAuthToken,
} = require("../middleware/jwt.middleware");
const router = express.Router();

router.get("/all", validateAuthToken, adminAuthToken, BlogController.findAll);
router.get("views/:id", validateAuthToken, adminAuthToken, BlogController.getByNumbersOfViews);
router.post(
  "/create",
  validateAuthToken,
  adminAuthToken,
  BlogController.create
);
router.put("/:id", validateAuthToken, adminAuthToken, BlogController.update);
router.delete("/:id", validateAuthToken, adminAuthToken, BlogController.delete);

module.exports = router;
