router = require("express").Router();
const DeclinedSupplyController = require("../../controllers/farmers/declinedSuppliesController");

router.post("/add", DeclinedSupplyController.addDeclinedSupply);
router.get("/", DeclinedSupplyController.getAllDeclinedSupplies);
router.get("/get/:id", DeclinedSupplyController.getOneDeclinedSupply);
router.delete("/delete/:id", DeclinedSupplyController.deleteDeclinedSupply);
router.put("/update/:id", DeclinedSupplyController.updateDeclinedSupply);
router.get("/totalDeclinedSupplies", DeclinedSupplyController.getTotalDeclinedSuppliesCount);

module.exports = router;