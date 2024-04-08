const FarmerJoiningRequest = require("../../models/farmers/farmerJoiningRequests");
const addFarmerJoiningRequest = async (req, res) => {
  const { NIC, description, email, city, fieldArea, landDeed } = req.body;
  try {
    const newFarmerJoiningRequest = await FarmerJoiningRequest.create({ NIC, description, email, city, fieldArea, landDeed });
    res.json("New Request Added");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllFarmerJoiningRequests = async (req, res) => {
  try {
    const farmers = await FarmerJoiningRequest.find();
    res.json(farmerJoiningRequests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getOneFarmerJoiningRequest = async (req, res) => {
  const id = req.params.id;
  try {
    const farmerJoiningRequest = await FarmerJoiningRequest.findById(id);
    res.status(200).json(farmerJoiningRequest);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteFarmerJoiningRequest = async (req, res) => {
  const id = req.params.id;
  try {
    await FarmerJoiningRequest.findByIdAndDelete(id);
    res.status(200).json({ message: "Request Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateFarmerJoiningRequest = async (req, res) => {
  const id = req.params.id;
  const { NIC, description, email, city, fieldArea, landDeed } = req.body;
  try {
    await FarmerJoiningRequest.findByIdAndUpdate(id, { NIC, description, email, city, fieldArea, landDeed });
    res.status(200).json({ message: "Request updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  addFarmerJoiningRequest,
  getAllFarmerJoiningRequests,
  getOneFarmerJoiningRequest,
  deleteFarmerJoiningRequest,
  updateFarmerJoiningRequest,
};