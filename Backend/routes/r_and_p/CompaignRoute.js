// ./Backend/routes/r_and_p/CompaignRoute.js
const router = require("express").Router();
const CompaignController = require("../../controllers/r_and_p/CompaignController");

router.post("/add", CompaignController.addCompaign);
router.get("/", CompaignController.getAllCompaigns);
router.get("/get/:id", CompaignController.getOneCompaign);
router.delete("/delete/:id", CompaignController.deleteCompaign);
router.put("/update/:id", CompaignController.updateCompaign);

module.exports = router;