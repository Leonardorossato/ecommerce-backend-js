const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/product.controller");
const {
  validateAuthToken,
  userAuthToken,
  adminAuthToken,
} = require("../middleware/jwt.middleware");

router.get("/all", ProductController.findAll);
router.get("/:id", ProductController.findOne);
router.get("/", ProductController.queryPagination);
router.post(
  "/create",
  validateAuthToken,
  adminAuthToken,
  ProductController.create
);
router.put(
  "/wishiList",
  validateAuthToken,
  userAuthToken,
  ProductController.addToWishiList
);
router.put(
  "/rating",
  validateAuthToken,
  userAuthToken,
  ProductController.ratingProduct
);
router.put("/:id", validateAuthToken, adminAuthToken, ProductController.update);
router.delete(
  "/:id",
  validateAuthToken,
  adminAuthToken,
  ProductController.delete
);

module.exports = router;
