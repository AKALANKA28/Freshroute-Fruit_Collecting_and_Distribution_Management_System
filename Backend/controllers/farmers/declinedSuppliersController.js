const DeclinedSupplier = require("../../models/farmers/declinedSuppliers");

const addDeclinedSupplier = async (req, res) => {
  const { name, email, mobile, city, latitude, longitude, NIC, landAddress, fieldArea, landDeedUrl, joinRequestId } = req.body;
  try {
    const newDeclinedSupplier = await DeclinedSupplier.create({ name, email, mobile, city, latitude, longitude, NIC, landAddress, fieldArea, landDeedUrl, joinRequestId });
    res.json("New Supplier Added");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllDeclinedSuppliers = async (req, res) => {
  try {
    const declinedSuppliers = await DeclinedSupplier.find();
    res.json(declinedSuppliers);
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

const getOneDeclinedSupplier = async (req, res) => {
  const id = req.params.id;
  try {
    const declinedSupplier = await DeclinedSupplier.findById(id);
    res.status(200).json(declinedSupplier);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteDeclinedSupplier = async (req, res) => {
  const id = req.params.id;
  try {
    await DeclinedSupplier.findByIdAndDelete(id);
    res.status(200).json({ message: "Supplier Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateDeclinedSupplier = async (req, res) => {
  const id = req.params.id;
  const { name, email, mobile, city, latitude, longitude, NIC, landAddress, fieldArea, landDeedUrl, joinRequestId } = req.body;
  try {
    await DeclinedSupplier.findByIdAndUpdate(id, { name, email, mobile, city, latitude, longitude, NIC, landAddress, fieldArea, landDeedUrl, joinRequestId });
    res.status(200).json({ message: "Supplier updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  addDeclinedSupplier,
  getAllDeclinedSuppliers,
  getOneDeclinedSupplier,
  deleteDeclinedSupplier,
  updateDeclinedSupplier,
};