const express = require('express');
const router = express.Router();
const salesController = require('../../controllers/finance/salesController');

// Add a new sales record
router.post("/add", salesController.addSale);

// Retrieve all sales records
router.get("/", salesController.getAllSales);

// Retrieve a specific sales record by ID
router.get("/get/:id", salesController.getSaleById);

// Update a sales record
router.patch("/update/:id", salesController.updateSale);

// Delete a sales record
router.delete("/delete/:id", salesController.deleteSale);

module.exports = router;
