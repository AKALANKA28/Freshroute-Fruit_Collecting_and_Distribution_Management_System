const Farmer = require("../../models/farmers/farmers");
const cityCoordinates = require("./cityCoordinates.json");

const addFarmer = async (req, res) => {
  const { NIC, username, name, email, mobile, city, lane, landAddress, fieldArea, landDeedUrl, joinRequestId } = req.body;
  try {
    let latitude = "";
    let longitude = "";
    const cityInfo = cityCoordinates.find((c) => c.city.toLowerCase() === city.toLowerCase());
    if (cityInfo) {
      latitude = cityInfo.latitude;
      longitude = cityInfo.longitude;
    }
    const newFarmer = await Farmer.create({ NIC, username, name, email, mobile, city, latitude, longitude, lane, landAddress, fieldArea, landDeedUrl, joinRequestId });
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
  const { NIC, username, name, email, mobile, city, latitude, longitude, lane, landAddress, fieldArea, landDeedUrl, joinRequestId } = req.body;
  try {
    await Farmer.findByIdAndUpdate(id, { NIC, username, name, email, mobile, city, latitude, longitude,lane, landAddress, fieldArea, landDeedUrl, joinRequestId });
    res.status(200).json({ message: "Farmer updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteFarmerByJoinRequestID = async (req, res) => {
  const joinRequestId = req.params.joinRequestId;
  try {
    await Farmer.deleteMany({ joinRequestId: joinRequestId });
    res.status(200).json({ message: "Pending Supplies Deleted by Join Request ID" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getTotalFarmersCount = async (req, res) => {
  try {
    const count = await Farmer.countDocuments();
    res.status(200).json({ count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getCities = async (req, res) => {
  try {
    const cities = cityCoordinates.map((c) => c.city);
    res.status(200).json(cities);
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
  deleteFarmerByJoinRequestID,
  getTotalFarmersCount,
  getCities
};