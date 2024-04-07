const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');
const { uploadPhoto, productImgResize } = require('../middlewares/uploadImages');


router.post("/add", authMiddleware, isAdmin, productController.createProduct);
router.get("/", productController.getAllProducts);
router.get("/:id", productController.getaProduct);
router.put("/upload/:id", authMiddleware, isAdmin, uploadPhoto.array('images',10), productImgResize, productController.uploadImages);

router.put("/:id", authMiddleware, isAdmin, productController.updateProduct);
router.delete("/:id", authMiddleware, isAdmin, productController.deleteProduct);




module.exports = router;
