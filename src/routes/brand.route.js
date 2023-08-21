const express = require("express");
const BrandController = require("../controllers/brand.controller");
const { validateAuthToken, adminAuthToken } = require("../middleware/jwt.middleware");
const router = express.Router();

router.get("/all", BrandController.findAll);
router.get("/:id", BrandController.findOne);
router.post(
  "/create",
  validateAuthToken,
  adminAuthToken,
  BrandController.create
);
router.put("/:id", validateAuthToken, adminAuthToken, BrandController.update);
router.delete(
  "/:id",
  validateAuthToken,
  adminAuthToken,
  BrandController.delete
);

module.exports = router;
