const JoiningRequest = require("../models/joiningRequests");
const PendingSupplier = require("../models/farmers/pendingSuppliers");
const cityCoordinates = require("./farmers/cityCoordinates.json")

const addJoiningRequest = async (req, res) => {
  const { name, email, mobile, city, NIC, landAddress, fieldArea, landDeedUrl } = req.body;
  try {
    let latitude = "";
    let longitude = "";
    const cityInfo = cityCoordinates.find((c) => c.city.toLowerCase() === city.toLowerCase());
    if (cityInfo) {
      latitude = cityInfo.latitude;
      longitude = cityInfo.longitude;
    }
    const newJoiningRequest = await JoiningRequest.create({ 
      name, 
      email, 
      mobile, 
      city, 
      latitude, 
      longitude, 
      NIC, 
      landAddress, 
      fieldArea, 
      landDeedUrl 
    });
    
    // Check if there is already a pending supplier associated with the joining request
    const existingPendingSupplier = await PendingSupplier.findOne({ joinRequestId: newJoiningRequest._id });
    
    if (!existingPendingSupplier) {
      const pendingSupplier = await PendingSupplier.create({
        ...newJoiningRequest.toObject(),
        joinRequestId: newJoiningRequest._id // Associate joining request ID with pending supplier
      });
    }
    
    res.status(201).json(newJoiningRequest); // Return newly created joining request
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllJoiningRequests = async (req, res) => {
  try {
    const joiningRequests = await JoiningRequest.find();
    res.json(joiningRequests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getOneJoiningRequest = async (req, res) => {
  const id = req.params.id;
  try {
    const joiningRequest = await JoiningRequest.findById(id);
    res.status(200).json(joiningRequest);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteJoiningRequest = async (req, res) => {
  const id = req.params.id;
  try {
    await JoiningRequest.findByIdAndDelete(id);
    res.status(200).json({ message: "Request Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateJoiningRequest = async (req, res) => {
  const id = req.params.id;
  const { name, email, mobile, city, latitude, longitude, NIC, landAddress, fieldArea, landDeed, status } = req.body;
  try {
    await JoiningRequest.findByIdAndUpdate(id, { name, email, mobile, city, latitude, longitude, NIC, landAddress, fieldArea, landDeed, status });
    res.status(200).json({ message: "Request updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const acceptJoiningRequest = async (req, res) => {
  const id = req.params.id;
  try {
    const joiningRequest = await JoiningRequest.findByIdAndUpdate(id, { status: 'Approved' }, { new: true });
    if (!joiningRequest) {
      return res.status(404).json({ message: "Joining Request not found" });
    }
    res.status(200).json({ message: "Joining Request Approved" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const declineJoiningRequest = async (req, res) => {
  const id = req.params.id;
  try {
    const joiningRequest = await JoiningRequest.findByIdAndUpdate(id, { status: 'Declined' }, { new: true });
    if (!joiningRequest) {
      return res.status(404).json({ message: "Joining Request not found" });
    }
    res.status(200).json({ message: "Joining Request Declined" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addJoiningRequest,
  getAllJoiningRequests,
  getOneJoiningRequest,
  deleteJoiningRequest,
  updateJoiningRequest,
  acceptJoiningRequest,
  declineJoiningRequest
};