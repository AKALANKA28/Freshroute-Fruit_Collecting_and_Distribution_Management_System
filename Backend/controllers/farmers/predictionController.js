///Users/heshan/Desktop/ITP/Untitled/Backend/controllers/farmers/farmerController.js
const Prediction = require("../../models/farmers/predictions");

const addPrediction = async (req, res) => {
  const { fruitType, quality, quantity, price, dateCanBeGiven } = req.body;
  try {
    const newPrediction = await Prediction.create({ fruitType, quality, quantity, price, dateCanBeGiven });
    res.json("New Supply Prediction Added");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllPredictions = async (req, res) => {
  try {
    const predictions = await Prediction.find();
    res.json(predictions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getOnePrediction = async (req, res) => {
  const id = req.params.id;
  try {
    const prediction = await Prediction.findById(id);
    res.status(200).json(prediction);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deletePrediction = async (req, res) => {
  const id = req.params.id;
  try {
    await Prediction.findByIdAndDelete(id);
    res.status(200).json({ message: "Supply Prediction Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updatePrediction = async (req, res) => {
  const id = req.params.id;
  const { fruitType, quality, quantity, price, dateCanBeGiven } = req.body;
  try {
    await Prediction.findByIdAndUpdate(id, { fruitType, quality, quantity, price, dateCanBeGiven });
    res.status(200).json({ message: "Prediction updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  addPrediction,
  getAllPredictions,
  getOnePrediction,
  deletePrediction,
  updatePrediction,
};