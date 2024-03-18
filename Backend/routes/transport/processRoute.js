const express = require('express');
const router = express.Router();
const processController = require('../../controllers/transport/processController');

// Add a new process record
router.post("/add", processController.addprocess);

// Retrieve all process records
router.get("/", processController.getAllprocess);

// Retrieve a specific process record by ID
router.get("/get/:id", processController.getprocessById);

// Update a process record
router.patch("/update/:id", processController.updateprocess);

// Delete a process record
router.delete("/delete/:id", processController.deleteprocess);

module.exports = router;
