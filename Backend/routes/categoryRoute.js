const express = require('express');
const categoryController = require('../controllers/categoryController');

const router = express.Router();
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');


router.post("/add", authMiddleware, isAdmin, categoryController.createCategory);
router.get("/", categoryController.getallCategory);
router.get("/get/:id", categoryController.getCategory);
router.put("/update/:id",authMiddleware, isAdmin, categoryController.updateCategory);
router.delete("/delete/:id",authMiddleware, isAdmin, categoryController.deleteCategory);


module.exports = router;
