const Vehicle = require("../../models/transport/vehicle");

// Add a new vehicle record
exports.addVehicle = async (req, res) => {
  try {
    const {
      vehicle_no,
      type,
      conditions,
      capacity,
      owner_name,
      // nic,
      email,
      phone,
      Bank,
      Branch,
      account_no,
      price,
      paid,
    } = req.body;

    const newVehicle = new Vehicle({
      vehicle_no,
      type,
      conditions,
      capacity,
      owner_name,
      // nic,
      email,
      phone,
      Bank,
      Branch,
      account_no,
      price,
      paid,
    });

    await newVehicle.save();
    res.json("Vehicle Added");
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ status: "Error adding vehicle record", error: err.message });
  }
};

// Retrieve all vehicle records
exports.getAllVehicle = async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.json(vehicles);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ status: "Error retrieving vehicle records", error: err.message });
  }
};

// Retrieve a specific vehicle record by ID
exports.getVehicleById = async (req, res) => {
  try {
    const vehicleId = req.params.id;
    const vehicle = await Vehicle.findById(vehicleId);

    if (!vehicle) {
      return res.status(404).json({ status: "vehicle not found" });
    }

    res.status(200).json({ status: "Vehicle fetched", vehicle });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ status: "Error retrieving vehicle record", error: err.message });
  }
};

// Update a vehicle record
exports.updateVehicle = async (req, res) => {
  try {
    const vehicleId = req.params.id;
    const {
      vehicle_no,
      type,
      conditions,
      capacity,
      owner_name,
      // nic,
      email,
      phone,
      Bank,
      Branch,
      account_no,
      price,
      paid,
    } = req.body;

    const updateVehicle = {
      vehicle_no,
      type,
      conditions,
      capacity,
      owner_name,
      // nic,
      email,
      phone,
      Bank,
      Branch,
      account_no,
      price,
      paid,
    };

    const updatedVehicle = await Vehicle.findByIdAndUpdate(
      vehicleId,
      updateVehicle,
      { new: true }
    );

    if (!updatedVehicle) {
      return res.status(404).json({ status: "Vehicle not found" });
    }

    res.status(200).json({ status: "Vehicle record updated", updatedVehicle });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ status: "Error updating vehicle record", error: err.message });
  }
};

// Delete a vehicle record
exports.deleteVehicle = async (req, res) => {
  try {
    const vehicleId = req.params.id;
    await Vehicle.findByIdAndDelete(vehicleId);
    res.status(200).json({ status: "Vehicle record deleted" });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ status: "Error deleting Vehicle record", error: err.message });
  }
};
