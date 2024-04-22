// D:\FreshRoute\MERN_Project\Backend\routes\coordinator\TransportFeeRoute.js
const router = require("express").Router();
const TransportFeeCtrl = require("../../controllers/coordinator/TransportFeeCtrl");

router.get("/", TransportFeeCtrl.getAllTransportFees);
router.get("/get/:id", TransportFeeCtrl.getOneTransportFee);
router.put("/update/:id", TransportFeeCtrl.updateTransportFee);

module.exports = router;
