const express = require("express");
const ProductController = require("../controllers/product.controller");
const router = express.Router();

router.get("/all", ProductController.findAll);
router.post("/create", ProductController.create);
router.get("/:id", ProductController.findOne);
router.put("/:id", ProductController.update);
router.delete("/:id", ProductController.delete);

module.exports = router;
