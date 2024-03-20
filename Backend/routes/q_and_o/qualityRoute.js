const express = require('express');
const router = express.Router();
const qualityController = require('../../controllers/q_and_o/qualityController.js');

// Add a new quality record
router.post("/add", qualityController.addQuality);

// Retrieve all quality records
router.get("/", qualityController.getAllQualities); // Corrected function name

// Retrieve a specific quality record by ID
router.get("/get/:id", qualityController.getQualityById);

// Update a quality record
router.put("/update/:id", qualityController.updateQuality);

// Delete a quality record
router.delete("/delete/:id", qualityController.deleteQuality);

module.exports = router;
