// D:\FreshRoute\MERN_Project\Backend\routes\coordinator\FruitTypeRoute.js
const router = require("express").Router();
const FruitTypeCtrl = require("../../controllers/coordinator/FruitTypeCtrl");

router.post("/add", FruitTypeCtrl.addFruitType);
router.get("/", FruitTypeCtrl.getAllFruitTypes);
router.get("/get/:id", FruitTypeCtrl.getOneFruitType);
router.delete("/delete/:id", FruitTypeCtrl.deleteFruitType);
router.put("/update/:id", FruitTypeCtrl.updateFruitType);

module.exports = router;
