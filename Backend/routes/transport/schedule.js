const express = require('express');
const router = express.Router();
const makescheduleController = require('../../controllers/transport/schedule');

// Add a new schedule record
router.post("/add", makescheduleController.addSchedule);

// Retrieve all schedule records
router.get("/", makescheduleController.getAllSchedule);

// Retrieve a specific schedule record by ID
router.get("/get/:id", makescheduleController.getScheduleById);

// Update a schedule record
router.patch("/update/:id", makescheduleController.updateSchedule);

// Delete a schedule record
router.delete("/delete/:id", makescheduleController.deleteSchedule);

module.exports = router;
