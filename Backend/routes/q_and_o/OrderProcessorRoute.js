const express = require('express');
const router = express.Router();
const orderProcessController = require('../../controllers/q_and_o/OrderProcessController');

// Add a new quality record
// router.post("/add", orderProcessController.addQuality);
router.post("/mock/add", orderProcessController.addToMock); // Corrected function name

// Retrieve all quality records
// router.get("/", orderProcessController.getAllQualities); // Corrected function name

// Retrieve a specific quality record by ID
// router.get("/get/:id", orderProcessController.getQualityById);

// Update a quality record
// router.put("/update/:id", orderProcessController.updateQuality);

// Delete a quality record
// router.delete("/delete/:id", orderProcessController.deleteQuality);

module.exports = router;
