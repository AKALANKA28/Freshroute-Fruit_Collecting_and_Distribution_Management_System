//Backend/controllers/coordinator/TransportFeeCtrl.js
const TransportFee = require("../../models/transport/vehicle");

const getAllTransportFees = async (req, res) => {
  try {
    const transportFees = await TransportFee.find();
    res.json(transportFees);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "Error retrieving Transport Fee records",
      error: err.message,
    });
  }
};

const getOneTransportFee = async (req, res) => {
  try {
    const transportFeeId = req.params.id;
    const transportFee = await TransportFee.findById(transportFeeId);

    if (!transportFee) {
      return res.status(404).json({ status: "Transport Fee not found" });
    }

    res.status(200).json({ status: "Transport Fee fetched", transportFee });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "Error retrieving Transport Fee record",
      error: err.message,
    });
  }
};

const updateTransportFee = async (req, res) => {
  try {
    const vehicleId = req.params.id;
    const { vehicle_no, type, conditions, capacity, price } = req.body;

    const updateTransportFee = {
      vehicle_no,
      type,
      conditions,
      capacity,
      price,
    };

    const updatedTransportFee = await TransportFee.findByIdAndUpdate(
      vehicleId,
      updateTransportFee,
      { new: true }
    );

    if (!updatedTransportFee) {
      return res.status(404).json({ status: "Transport Fee not found" });
    }

    res
      .status(200)
      .json({ status: "Transport Fee Updated", updatedTransportFee });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "Error updating Transport Fee record",
      error: err.message,
    });
  }
};

module.exports = {
  getAllTransportFees,
  getOneTransportFee,
  updateTransportFee,
};
