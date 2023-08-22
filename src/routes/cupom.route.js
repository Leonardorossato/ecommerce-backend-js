const express = require("express");
const CupomController = require("../controllers/cupom.controller");
const {
  validateAuthToken,
  adminAuthToken,
} = require("../middleware/jwt.middleware");
const router = express.Router();

router.get("/all", validateAuthToken, adminAuthToken, CupomController.findAll);
router.get("/:id", validateAuthToken, adminAuthToken, CupomController.findOne);
router.post(
  "/create",
  validateAuthToken,
  adminAuthToken,
  CupomController.create
);
router.put("/:id", validateAuthToken, adminAuthToken, CupomController.update);
router.delete(
  "/:id",
  validateAuthToken,
  adminAuthToken,
  CupomController.delete
);

module.exports = router;
