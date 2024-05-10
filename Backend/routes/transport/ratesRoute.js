const express = require('express');
const router = express.Router();
const ratesController = require('../../controllers/transport/processController');

// Add a new covering record
router.post("/add", ratesController.addrates);

// Retrieve all covering records
router.get("/", ratesController.getAllrates);

// Retrieve a specific covering record by ID
router.get("/get/:id", ratesController.getratesById);

// Update a covering record
router.patch("/update/:id", ratesController.updaterates);

// Delete a covering record
router.delete("/delete/:id", ratesController.deleterates);

module.exports = router;
