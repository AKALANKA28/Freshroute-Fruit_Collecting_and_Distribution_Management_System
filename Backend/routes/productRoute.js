const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');
const { uploadPhoto, productImgResize } = require('../middlewares/uploadImages');


// router.post("/add", authMiddleware, isAdmin, productController.createProduct);
router.post("/add", productController.createProduct);

router.get("/", productController.getAllProducts);
router.get("/:id", productController.getaProduct);
router.put("/upload", uploadPhoto.array('images',10), productImgResize, productController.uploadImages);
// router.put("/upload", authMiddleware, isAdmin, uploadPhoto.array('images',10), productImgResize, productController.uploadImages);

router.put("/:id", authMiddleware, isAdmin, productController.updateProduct);
router.delete("/:id", authMiddleware, isAdmin, productController.deleteProduct);
router.delete("/delete-img/:id", authMiddleware, isAdmin, productController.deleteImages);




module.exports = router;
