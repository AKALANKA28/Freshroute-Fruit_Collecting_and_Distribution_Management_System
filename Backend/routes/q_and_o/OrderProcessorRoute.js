const express = require('express');
const router = express.Router();
const orderProcessController = require('../../controllers/q_and_o/OrderProcessController');

// Add a new quality record
// router.post("/add", orderProcessController.addQuality);
router.post("/mock/add", orderProcessController.addToMock);

// Retrieve supplier list
router.post("/supplierList", orderProcessController.getSupplierList);

router.get("/pendingOrderList", orderProcessController.getAssignedOrderList);
router.get("/ongoingOrderList", orderProcessController.getOngoingOrderList);
router.get("/completedOrderList", orderProcessController.getCompletedOrderList);

router.post("/pendingOrderList", orderProcessController.getAssignedOrderListByFilter);
router.post("/ongoingOrderList", orderProcessController.getOngoingOrderListByFilter);
router.post("/completedOrderList", orderProcessController.getCompletedOrderListByFilter);

module.exports = router;
