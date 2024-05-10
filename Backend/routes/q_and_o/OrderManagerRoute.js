const express = require('express');
const router = express.Router();
const qualityController = require('../../controllers/q_and_o/QualityController.js');
const orderManageController = require('../../controllers/q_and_o/OrderManageController');

/** Quality */
// Add a new quality record
router.put("/quality/update", qualityController.addEditQuality);

// Retrieve all quality records
router.get("/quality/", qualityController.getAllQualities);

router.get("/quality/undefinedQuality", qualityController.getUndefinedQualityList);

// Retrieve a specific quality record by ID
router.get("/quality/get/:id", qualityController.getQualityById);

// Delete a quality record
router.delete("/quality/delete/:id", qualityController.removeQuality);

//Get filtered quality list
router.post("/quality/filteredQualities", qualityController.getFilteredQualities);

router.get("/quality/categorizedData", qualityController.getCategorizedFruitDetail);


/** Order Manager */

//Get Order List from Buyer Manager
router.get("/orderList", orderManageController.getAllOrderList);
router.get("/pendingOrderList", orderManageController.getPendingOrderList);
router.get("/ongoingOrderList", orderManageController.getOngoingOrderList);
router.get("/completedOrderList", orderManageController.getCompletedOrderList);

//Get filtered Order List from Buyer Manager
router.post("/pendingOrderList", orderManageController.getPendingOrderListByFilter);
router.post("/ongoingOrderList", orderManageController.getOngoingOrderListByFilter);
router.post("/completedOrderList", orderManageController.getCompletedOrderListByFilter);

// Get order processor list from  staff manager
router.get("/processorList", orderManageController.getOrderProcessorList);


// Assign order to order processor
router.post("/assignOrder", orderManageController.assignOrder);
router.post("/editAssignOrder", orderManageController.editAssignOrder);
router.delete("/unAssignOrder/:orderId", orderManageController.unAssignOrder);
module.exports = router;
