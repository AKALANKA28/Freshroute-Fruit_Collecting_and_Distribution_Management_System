const express = require('express');
const router = express.Router();
const revenueController = require('../../controllers/finance/revenueController');

// Add a new Revenue record
// router.post("/add", revenueController.addRevenue);

// Retrieve all Revenue records
router.get("/", revenueController.calculateRevenue);
router.delete("/deleteAll", revenueController.deleteAllRevenue);

// Retrieve a specific Revenue record by ID
// router.get("/get/:id", revenueController.getRevenueById);

// Update a Revenue record
// router.patch("/update/:id", revenueController.updateRevenue);

// Delete a Revenue record
// router.delete("/delete/:id", revenueController.deleteRevenue);

module.exports = router;
