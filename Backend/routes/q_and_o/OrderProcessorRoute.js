const express = require('express');
const router = express.Router();
const orderProcessController = require('../../controllers/q_and_o/OrderProcessController');


// Retrieve filtered supplier
router.post("/supplierList", orderProcessController.getSupplierList);
// Retrieve All supplier
router.get("/allSuppliers", orderProcessController.getAllSuppliers);
//Filtered Supplier List
router.post("/allSuppliers", orderProcessController.getAllSuppliersByFilter);
router.post("/updateSupplierDetails", orderProcessController.updateSuppliers);

router.get("/pendingOrderList", orderProcessController.getAssignedOrderList);
router.get("/ongoingOrderList", orderProcessController.getOngoingOrderList);
router.get("/completedOrderList", orderProcessController.getCompletedOrderList);
router.get("/recentOrders", orderProcessController.getRecentOrders);

router.post("/pendingOrderList", orderProcessController.getAssignedOrderListByFilter);
router.post("/ongoingOrderList", orderProcessController.getOngoingOrderListByFilter);
router.post("/completedOrderList", orderProcessController.getCompletedOrderListByFilter);


router.post("/executeOrder", orderProcessController.executeOrder);


module.exports = router;
