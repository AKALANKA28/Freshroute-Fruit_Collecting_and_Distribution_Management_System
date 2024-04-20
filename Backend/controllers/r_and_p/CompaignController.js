// ./Backend/controllers/r_and_p/CompaignController.js
const Compaign = require("../../models/r_and_p/Compaign");

const addCompaign = async (req, res) => {
  const { compaign_title, date, objective, target_aud, budjet } = req.body;
  try {
    const newCompaign = await Compaign.create({ compaign_title, date, objective, target_aud, budjet });
    res.json("New Compaign Added");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllCompaigns = async (req, res) => {
  try {
    const compaigns = await Compaign.find();
    res.json(compaigns);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getOneCompaign = async (req, res) => {
  const id = req.params.id;
  try {
    const compaign = await Compaign.findById(id);
    res.status(200).json(compaign);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteCompaign = async (req, res) => {
  const id = req.params.id;
  try {
    await Compaign.findByIdAndDelete(id);
    res.status(200).json({ message: "Compaign Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateCompaign = async (req, res) => {
  const id = req.params.id;
  const { compaign_title, date, objective, target_aud, budjet } = req.body;
  try {
    await Compaign.findByIdAndUpdate(id, { compaign_title, date, objective, target_aud, budjet });
    res.status(200).json({ message: "Compaign updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  addCompaign,
  getAllCompaigns,
  getOneCompaign,
  deleteCompaign,
  updateCompaign,
};
