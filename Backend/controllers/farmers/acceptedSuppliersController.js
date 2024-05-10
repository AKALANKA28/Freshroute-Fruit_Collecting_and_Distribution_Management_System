const AcceptedSupplier = require("../../models/farmers/acceptedSuppliers");

const addAcceptedSupplier = async (req, res) => {
  const { name, email, mobile, city, latitude, longitude, NIC, landAddress, fieldArea, landDeedUrl, joinRequestId } = req.body;
  try {
    const newAcceptedSupplier = await AcceptedSupplier.create({ name, email, mobile, city, latitude, longitude, NIC, landAddress, fieldArea, landDeedUrl, joinRequestId });
    res.json("New Supplier Added");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllAcceptedSuppliers = async (req, res) => {
  try {
    const acceptedSuppliers = await AcceptedSupplier.find();
    res.json(acceptedSuppliers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getOneAcceptedSupplier = async (req, res) => {
  const id = req.params.id;
  try {
    const acceptedSupplier = await AcceptedSupplier.findById(id);
    res.status(200).json(acceptedSupplier);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteAcceptedSupplier = async (req, res) => {
  const id = req.params.id;
  try {
    await AcceptedSupplier.findByIdAndDelete(id);
    res.status(200).json({ message: "Supplier Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateAcceptedSupplier = async (req, res) => {
  const id = req.params.id;
  const { name, email, mobile, city, latitude, longitude, NIC, landAddress, fieldArea, landDeedUrl, joinRequestId } = req.body;
  try {
    await AcceptedSupplier.findByIdAndUpdate(id, { name, email, mobile, city, latitude, longitude, NIC, landAddress, fieldArea, landDeedUrl, joinRequestId });
    res.status(200).json({ message: "Supplier updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  addAcceptedSupplier,
  getAllAcceptedSuppliers,
  getOneAcceptedSupplier,
  deleteAcceptedSupplier,
  updateAcceptedSupplier,
};