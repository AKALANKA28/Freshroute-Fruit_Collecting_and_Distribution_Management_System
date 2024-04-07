const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');


router.post("/add", authMiddleware, isAdmin, productController.createProduct);
router.get("/", productController.getAllProducts);
router.get("/:id", productController.getaProduct);
router.put("/:id",authMiddleware, isAdmin, productController.updateProduct);
router.delete("/:id",authMiddleware, isAdmin, productController.deleteProduct);


module.exports = router;
