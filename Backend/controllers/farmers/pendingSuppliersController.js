const PendingSupplier = require("../../models/farmers/pendingSuppliers");

const addPendingSupplier = async (req, res) => {
  const { name, email, mobile, city, NIC, landAddress, fieldArea, landDeedUrl, joinRequestId } = req.body;
  try {
    const newPendingSupplier = await PendingSupplier.create({ name, email, mobile, city, NIC, landAddress, fieldArea, landDeedUrl, joinRequestId });
    res.json("New Supplier Added");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllPendingSuppliers = async (req, res) => {
  try {
    const pendingSuppliers = await PendingSupplier.find();
    res.json(pendingSuppliers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getOnePendingSupplier = async (req, res) => {
  const id = req.params.id;
  try {
    const pendingSupplier = await PendingSupplier.findById(id);
    res.status(200).json(pendingSupplier);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deletePendingSupplier = async (req, res) => {
  const id = req.params.id;
  try {
    await PendingSupplier.findByIdAndDelete(id);
    res.status(200).json({ message: "Supplier Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updatePendingSupplier = async (req, res) => {
  const id = req.params.id;
  const { name, email, mobile, city, NIC, landAddress, fieldArea, landDeedUrl, joinRequestId } = req.body;
  try {
    await PendingSupplier.findByIdAndUpdate(id, { name, email, mobile, city, NIC, landAddress, fieldArea, landDeedUrl, joinRequestId });
    res.status(200).json({ message: "Supplier updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deletePendingSupplierByJoinRequestId = async (req, res) => {
  const joinRequestId = req.params.joinRequest;
  try {
    await PendingSupplier.deleteMany({ joinRequestId: joinRequestId });
    res.status(200).json({ message: "Pending Suppliers Deleted by Join Request ID" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getPendingSupplierByJoiningRequestId = async (req, res) => {
  const joinRequestId = req.params.joinRequestId;
  try {
    const pendingSupplier = await PendingSupplier.findOne({ joinRequestId: joinRequestId });
    res.status(200).json(pendingSupplier);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  addPendingSupplier,
  getAllPendingSuppliers,
  getOnePendingSupplier,
  deletePendingSupplier,
  updatePendingSupplier,
  deletePendingSupplierByJoinRequestId,
  getPendingSupplierByJoiningRequestId
};
