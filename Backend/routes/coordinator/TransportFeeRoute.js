// ./Backend/routes/coordinator/TransportFeeRoute.js
const router = require("express").Router();
const TransportFeeCtrl = require("../../controllers/coordinator/TransportFeeCtrl");

router.post("/add", TransportFeeCtrl.addTransportFee);
router.get("/", TransportFeeCtrl.getAllTransportFees);
router.get("/get/:id", TransportFeeCtrl.getOneTransportFee);
router.delete("/delete/:id", TransportFeeCtrl.deleteTransportFee);
router.put("/update/:id", TransportFeeCtrl.updateTransportFee);

module.exports = router;
