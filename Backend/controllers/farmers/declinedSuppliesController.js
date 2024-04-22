const DeclinedSupply = require("../../models/farmers/declinedSupplies");

const addDeclinedSupply = async (req, res) => {
  const { fruit, subCategory, quality, quantity, price, dateCanBeGiven, predictionID } = req.body;
  try {
    const newDeclinedSupply = await DeclinedSupply.create({ fruit, subCategory, quality, quantity, price, dateCanBeGiven, predictionID });
    res.json("Supply Declined");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllDeclinedSupplies = async (req, res) => {
  try {
    const declinedSupplies = await DeclinedSupply.find();
    res.json(declinedSupplies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getOneDeclinedSupply = async (req, res) => {
  const id = req.params.id;
  try {
    const declinedSupply = await DeclinedSupply.findById(id);
    res.status(200).json(declinedSupply);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteDeclinedSupply = async (req, res) => {
  const id = req.params.id;
  try {
    await DeclinedSupply.findByIdAndDelete(id);
    res.status(200).json({ message: "Supply Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateDeclinedSupply = async (req, res) => {
  const id = req.params.id;
  const { fruit, subCategory, quality, quantity, price, dateCanBeGiven, predictionID } = req.body;
  try {
    await DeclinedSupply.findByIdAndUpdate(id, { fruit, subCategory, quality, quantity, price, dateCanBeGiven, predictionID });
    res.status(200).json({ message: "Supply updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getTotalDeclinedSuppliesCount = async (req, res) => {
  try {
    const count = await DeclinedSupply.countDocuments();
    res.status(200).json({ count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  addDeclinedSupply,
  getAllDeclinedSupplies,
  getOneDeclinedSupply,
  deleteDeclinedSupply,
  updateDeclinedSupply,
  getTotalDeclinedSuppliesCount
};