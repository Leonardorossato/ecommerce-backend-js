const express = require("express");
const BlogController = require("../controllers/blog.controller");
const {
  validateAuthToken,
  adminAuthToken,
} = require("../middleware/jwt.middleware");
const {
  uploadPhoto,
  productImgResize,
} = require("../middleware/multer.middleware");
const router = express.Router();

router.get("/all", validateAuthToken, adminAuthToken, BlogController.findAll);
router.get(
  "/views/:id",
  validateAuthToken,
  adminAuthToken,
  BlogController.getByNumbersOfViews
);
router.post(
  "/create",
  validateAuthToken,
  adminAuthToken,
  BlogController.create
);
router.put("/likes", validateAuthToken, BlogController.likeBlog);
router.put(
  "/blog-upload/:id",
  validateAuthToken,
  adminAuthToken,
  uploadPhoto.array("images", 2),
  productImgResize,
  BlogController.uploadBlogImages
);
router.put("/dislikes", validateAuthToken, BlogController.deslikeBlog);
router.put("/:id", validateAuthToken, adminAuthToken, BlogController.update);
router.delete("/:id", validateAuthToken, adminAuthToken, BlogController.delete);

module.exports = router;
