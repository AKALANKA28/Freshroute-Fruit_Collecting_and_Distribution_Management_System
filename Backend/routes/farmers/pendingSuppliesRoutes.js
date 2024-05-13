const router = require("express").Router();
const PendingSupplyController = require("../../controllers/farmers/pendingSuppliesController");

router.post("/add", PendingSupplyController.addPendingSupply);
router.get("/", PendingSupplyController.getAllPendingSupplies);
router.get("/get/:id", PendingSupplyController.getOnePendingSupply);
router.delete("/delete/:id", PendingSupplyController.deletePendingSupply);
router.put("/update/:id", PendingSupplyController.updatePendingSupply);
router.delete("/deleteByPredictionID/:predictionID", PendingSupplyController.deletePendingSupplyByPredictionID);
router.get("/totalPendingSupplies", PendingSupplyController.getTotalPendingSuppliesCount);

module.exports = router;
