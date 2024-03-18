const Farmer = require("../../models/farmers/farmers");

const addFarmer = async (req, res) => {
  const { NIC, username, name, email, city, lane } = req.body;
  try {
    const newFarmer = await Farmer.create({ NIC, username, name, email, city, lane });
    res.json("New Farmer Added");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllFarmers = async (req, res) => {
  try {
    const farmers = await Farmer.find();
    res.json(farmers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getOneFarmer = async (req, res) => {
  const id = req.params.id;
  try {
    const farmer = await Farmer.findById(id);
    res.status(200).json(farmer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteFarmer = async (req, res) => {
  const id = req.params.id;
  try {
    await Farmer.findByIdAndDelete(id);
    res.status(200).json({ message: "Farmer Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateFarmer = async (req, res) => {
  const id = req.params.id;
  const { NIC, username, name, email, city, lane } = req.body;
  try {
    await Farmer.findByIdAndUpdate(id, { NIC, username, name, email, city, lane });
    res.status(200).json({ message: "Farmer updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  addFarmer,
  getAllFarmers,
  getOneFarmer,
  deleteFarmer,
  updateFarmer,
};