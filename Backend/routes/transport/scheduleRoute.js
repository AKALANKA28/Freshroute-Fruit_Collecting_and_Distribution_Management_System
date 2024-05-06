const express = require('express');
const router = express.Router();
const scheduleController = require('../../controllers/transport/scheduleController');

// Add a new schedule record
router.post("/add", scheduleController.addSchedule);

// Retrieve all schedule records
router.get("/", scheduleController.getAllSchedule);
router.get("/get/drivers", scheduleController.getAllDrivers);

// Retrieve a specific schedule record by ID
router.get("/get/:id", scheduleController.getScheduleById);

// Update a schedule record
router.patch("/update/:id", scheduleController.updateSchedule);

// Delete a schedule record
router.delete("/delete/:id", scheduleController.deleteSchedule);

module.exports = router;


