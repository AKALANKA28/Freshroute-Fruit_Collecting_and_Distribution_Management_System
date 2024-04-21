const router = require("express").Router();
const PendingSupplierController = require("../../controllers/farmers/pendingSuppliersController");

router.post("/add", PendingSupplierController.addPendingSupplier);
router.get("/", PendingSupplierController.getAllPendingSuppliers);
router.get("/get/:id", PendingSupplierController.getOnePendingSupplier);
router.delete("/delete/:id", PendingSupplierController.deletePendingSupplier);
router.put("/update/:id", PendingSupplierController.updatePendingSupplier);
router.delete("/deleteByJoinRequestId/:joinRequestId", PendingSupplierController.deletePendingSupplierByJoinRequestId);

module.exports = router;
