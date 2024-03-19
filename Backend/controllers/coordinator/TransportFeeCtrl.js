// .Backend/controllers/coordinator/TransportFeeCtrl.js
const TransportFee = require("../../models/coordinator/TransportFee");

const addTransportFee = async (req, res) => {
  const { vehicletype, date, maxweight, pricepkm } = req.body;
  try {
    const newTransportFee = await TransportFee.create({
      vehicletype,
      date,
      maxweight,
      pricepkm,
    });
    res.json("New TransportFee Added");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllTransportFees = async (req, res) => {
  try {
    const transportfees = await TransportFee.find();
    res.json(transportfees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getOneTransportFee = async (req, res) => {
  const id = req.params.id;
  try {
    const oneTransportFee = await TransportFee.findById(id);
    res.status(200).json(oneTransportFee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteTransportFee = async (req, res) => {
  const id = req.params.id;
  try {
    await TransportFee.findByIdAndDelete(id);
    res.status(200).json({ message: "TransportFee Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateTransportFee = async (req, res) => {
  const id = req.params.id;
  const { vehicletype, date, maxweight, pricepkm } = req.body;
  try {
    await TransportFee.findByIdAndUpdate(id, {
      vehicletype,
      date,
      maxweight,
      pricepkm,
    });
    res.status(200).json({ message: "TransportFee Updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  addTransportFee,
  getAllTransportFees,
  getOneTransportFee,
  deleteTransportFee,
  updateTransportFee,
};
