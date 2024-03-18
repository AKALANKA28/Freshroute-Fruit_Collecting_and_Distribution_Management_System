const express = require('express');
const router = express.Router();
const coveringsController = require('../../controllers/transport/coveringsController');

// Add a new covering record
router.post("/add", coveringsController.addcoverings);

// Retrieve all covering records
router.get("/", coveringsController.getAllcoverings);

// Retrieve a specific covering record by ID
router.get("/get/:id", coveringsController.getcoveringsById);

// Update a covering record
router.patch("/update/:id", coveringsController.updatecoverings);

// Delete a covering record
router.delete("/delete/:id", coveringsController.deletecoverings);

module.exports = router;
