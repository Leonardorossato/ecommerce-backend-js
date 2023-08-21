const express = require("express");
const router = express.Router();

const {
  validateAuthToken,
  adminAuthToken,
} = require("../middleware/jwt.middleware");
const BlogCategoryController = require("../controllers/blog.category.controller");

router.get("/all", BlogCategoryController.findAll);
router.get("/:id", BlogCategoryController.findOne);
router.post(
  "/create",
  validateAuthToken,
  adminAuthToken,
  BlogCategoryController.create
);
router.put(
  "/:id",
  validateAuthToken,
  adminAuthToken,
  BlogCategoryController.update
);
router.delete(
  "/:id",
  validateAuthToken,
  adminAuthToken,
  BlogCategoryController.delete
);

module.exports = router;
