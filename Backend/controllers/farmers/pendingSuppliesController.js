const PendingSupply = require("../../models/farmers/pendingSupplies");

const addPendingSupply = async (req, res) => {
  const { fruit, subCategory, quality, quantity, price, dateCanBeGiven, predictionID } = req.body;
  try {
    const newPendingSupply = await PendingSupply.create({ fruit, subCategory, quality, quantity, price, dateCanBeGiven, predictionID });
    res.json("New Supply Added");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllPendingSupplies = async (req, res) => {
  try {
    const pendingSupplies = await PendingSupply.find();
    res.json(pendingSupplies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getOnePendingSupply = async (req, res) => {
  const id = req.params.id;
  try {
    const pendingSupply = await PendingSupply.findById(id);
    res.status(200).json(pendingSupply);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deletePendingSupply = async (req, res) => {
  const id = req.params.id;
  try {
    await PendingSupply.findByIdAndDelete(id);
    res.status(200).json({ message: "Supply Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updatePendingSupply = async (req, res) => {
  const id = req.params.id;
  const { fruit, subCategory, quality, quantity, price, dateCanBeGiven, predictionID } = req.body;
  try {
    await PendingSupply.findByIdAndUpdate(id, { fruit, subCategory, quality, quantity, price, dateCanBeGiven, predictionID });
    res.status(200).json({ message: "Supply updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deletePendingSupplyByPredictionID = async (req, res) => {
  const predictionID = req.params.predictionID;
  try {
    await PendingSupply.deleteMany({ predictionID: predictionID });
    res.status(200).json({ message: "Pending Supplies Deleted by Prediction ID" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getTotalPendingSuppliesCount = async (req, res) => {
  try {
    const count = await PendingSupply.countDocuments();
    res.status(200).json({ count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  addPendingSupply,
  getAllPendingSupplies,
  getOnePendingSupply,
  deletePendingSupply,
  updatePendingSupply,
  deletePendingSupplyByPredictionID,
  getTotalPendingSuppliesCount
};
