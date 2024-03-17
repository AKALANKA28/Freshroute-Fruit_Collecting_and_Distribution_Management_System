const express = require('express');
const router = express.Router();
const addvehicleController = require('../../controllers/transport/vehicle');

// Add a new vehicle record
router.post("/add", addvehicleController.addVehicle);

// Retrieve all vehicle records
router.get("/", addvehicleController.getAllVehicle);

// Retrieve a specific vehicle record by ID
router.get("/get/:id", addvehicleController.getVehicleById);

// Update a vehicle record
router.patch("/update/:id", addvehicleController.updateVehicle);

// Delete a vehicle record
router.delete("/delete/:id", addvehicleController.deleteVehicle);

module.exports = router;
