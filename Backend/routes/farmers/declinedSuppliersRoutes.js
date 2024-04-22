router = require("express").Router();
const DeclinedSupplierController = require("../../controllers/farmers/declinedSuppliersController");

router.post("/add", DeclinedSupplierController.addDeclinedSupplier);
router.get("/", DeclinedSupplierController.getAllDeclinedSuppliers);
router.get("/get/:id", DeclinedSupplierController.getOneDeclinedSupplier);
router.delete("/delete/:id", DeclinedSupplierController.deleteDeclinedSupplier);
router.put("/update/:id", DeclinedSupplierController.updateDeclinedSupplier);

module.exports = router;