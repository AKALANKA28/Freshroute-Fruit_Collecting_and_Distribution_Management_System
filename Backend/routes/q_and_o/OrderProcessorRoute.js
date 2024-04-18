const express = require('express');
const router = express.Router();
const orderProcessController = require('../../controllers/q_and_o/OrderProcessController');


// Retrieve supplier list
router.post("/supplierList", orderProcessController.getSupplierList);

router.get("/pendingOrderList", orderProcessController.getAssignedOrderList);
router.get("/ongoingOrderList", orderProcessController.getOngoingOrderList);
router.get("/completedOrderList", orderProcessController.getCompletedOrderList);

router.post("/pendingOrderList", orderProcessController.getAssignedOrderListByFilter);
router.post("/ongoingOrderList", orderProcessController.getOngoingOrderListByFilter);
router.post("/completedOrderList", orderProcessController.getCompletedOrderListByFilter);


router.post("/executeOrder", orderProcessController.executeOrder);


module.exports = router;
