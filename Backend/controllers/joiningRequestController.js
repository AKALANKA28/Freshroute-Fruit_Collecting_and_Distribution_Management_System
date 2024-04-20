const JoiningRequest = require("../models/joiningRequests");

const addJoiningRequest = async (req, res) => {
  const { name, email, mobile, city, NIC, landAddress, fieldArea, landDeedUrl } = req.body;
  try {
    const newJoiningRequest = await JoiningRequest.create({ name, email, mobile, city, NIC, landAddress, fieldArea, landDeedUrl });

    res.json("New Request Added");
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
  const { name, email, mobile, city, NIC, landAddress, fieldArea, landDeed, status } = req.body;
  try {
    await JoiningRequest.findByIdAndUpdate(id, { name, email, mobile, city, NIC, landAddress, fieldArea, landDeed, status });
    res.status(200).json({ message: "Request updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  addJoiningRequest,
  getAllJoiningRequests,
  getOneJoiningRequest,
  deleteJoiningRequest,
  updateJoiningRequest,
};