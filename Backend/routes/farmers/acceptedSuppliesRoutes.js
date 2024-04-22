router = require("express").Router();
const AcceptedSupplyController = require("../../controllers/farmers/acceptedSuppliesController");

router.post("/add", AcceptedSupplyController.addAcceptedSupply);
router.get("/", AcceptedSupplyController.getAllAcceptedSupplies);
router.get("/get/:id", AcceptedSupplyController.getOneAcceptedSupply);
router.delete("/delete/:id", AcceptedSupplyController.deleteAcceptedSupply);
router.put("/update/:id", AcceptedSupplyController.updateAcceptedSupply);
router.get("/totalApprovedPrice", AcceptedSupplyController.getTotalApprovedPrice);
router.get("/totalApprovedSupplies", AcceptedSupplyController.getTotalApprovedSuppliesCount);

module.exports = router;