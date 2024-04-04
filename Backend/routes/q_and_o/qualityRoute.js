const express = require('express');
const router = express.Router();
const qualityController = require('../../controllers/q_and_o/qualityController.js');

// Add a new quality record
router.put("/update", qualityController.addEditQuality);

// Retrieve all quality records
router.get("/", qualityController.getAllQualities); // Corrected function name

// Retrieve a specific quality record by ID
router.get("/get/:id", qualityController.getQualityById);

// Delete a quality record
router.delete("/delete/:id", qualityController.removeQuality);

//Get filtered quality list
router.post("/filteredQualities", qualityController.getFilteredQualities);


router.get("/categorizedData", qualityController.getCategorizedFruitDetail);

module.exports = router;
