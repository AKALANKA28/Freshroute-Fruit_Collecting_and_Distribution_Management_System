// ./Backend\routes\r_and_p\PromotionRoute.js
const router = require("express").Router();
const PromotionController = require("../../controllers/r_and_p/PromotionController");

router.post("/add", PromotionController.addPromotion);
router.get("/", PromotionController.getAllPromotions);
router.get("/get/:id", PromotionController.getOnePromotion);
router.delete("/delete/:id", PromotionController.deletePromotion);
router.put("/update/:id", PromotionController.updatePromotion);

module.exports = router;
