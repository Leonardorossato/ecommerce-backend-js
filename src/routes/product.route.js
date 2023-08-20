const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/product.controller");

router.get("/all", ProductController.findAll);
router.get("/:id", ProductController.findOne);
router.get("/", ProductController.queryPagination);
router.post("/create", ProductController.create);
router.put("/:id", ProductController.update);
router.delete("/:id", ProductController.delete);

module.exports = router;
