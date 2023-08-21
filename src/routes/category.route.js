const express = require("express");
const router = express.Router();
const CategoryController = require("../controllers/category.controller");
const {
  validateAuthToken,
  adminAuthToken,
} = require("../middleware/jwt.middleware");

router.get("/all", CategoryController.findAll);
router.get("/:id", CategoryController.findOne);
router.post(
  "/create",
  validateAuthToken,
  adminAuthToken,
  CategoryController.create
);
router.put(
  "/:id",
  validateAuthToken,
  adminAuthToken,
  CategoryController.update
);
router.delete(
  "/:id",
  validateAuthToken,
  adminAuthToken,
  CategoryController.delete
);

module.exports = router;
