const express = require('express');
const router = express.Router();
const vehicleController = require('../../controllers/transport/vehicleController');

// Add a new vehicle record
router.post("/add", vehicleController.addVehicle);

// Retrieve all vehicle records
router.get("/", vehicleController.getAllVehicle);

// Retrieve a specific vehicle record by ID
router.get("/get/:id", vehicleController.getVehicleById);

// Update a vehicle record
router.patch("/update/:id", vehicleController.updateVehicle);

// Delete a vehicle record
router.delete("/delete/:id", vehicleController.deleteVehicle);

module.exports = router;
