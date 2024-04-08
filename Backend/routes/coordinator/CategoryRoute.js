// ./Backend/routes/coordinator/CategoryRoute.js
const router = require("express").Router();
const CategoryCtrl = require("../../controllers/coordinator/CategoryCtrl");

router.post("/add", CategoryCtrl.addCategory);
router.get("/", CategoryCtrl.getAllCategories);
router.get("/get/:id", CategoryCtrl.getOneCategory);
router.delete("/delete/:id", CategoryCtrl.deleteCategory);
router.put("/update/:id", CategoryCtrl.updateCategory);
router.get("/fruitdetails", CategoryCtrl.getFruitNames);
router.get("/subcategories/:fruit", CategoryCtrl.getSubCategoriesByFruit);
router.get("/qualities/:fruit", CategoryCtrl.getQualityFruit);

module.exports = router;
