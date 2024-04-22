router = require("express").Router();
const AcceptedSupplierController = require("../../controllers/farmers/acceptedSuppliersController");

router.post("/add", AcceptedSupplierController.addAcceptedSupplier);
router.get("/", AcceptedSupplierController.getAllAcceptedSuppliers);
router.get("/get/:id", AcceptedSupplierController.getOneAcceptedSupplier);
router.delete("/delete/:id", AcceptedSupplierController.deleteAcceptedSupplier);
router.put("/update/:id", AcceptedSupplierController.updateAcceptedSupplier);

module.exports = router;