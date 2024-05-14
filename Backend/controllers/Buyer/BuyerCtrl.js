// .Backend/controllers/Buyer/BuyerCtrl
const FruitType = require("../../models/coordinator/FruitType");

const addFruitType = async (req, res) => {
  const { name, date, description } = req.body;
  try {
    const newFruitType = await FruitType.create({ name, date, description });
    res.json("New FruitType Added");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllFruitTypes = async (req, res) => {
  try {
    const fruitTypes = await FruitType.find();
    res.json(fruitTypes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getOneFruitType = async (req, res) => {
  const id = req.params.id;
  try {
    const fruitType = await FruitType.findById(id);
    res.status(200).json(fruitType);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteFruitType = async (req, res) => {
  const id = req.params.id;
  try {
    await FruitType.findByIdAndDelete(id);
    res.status(200).json({ message: "Fruit Type Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateFruitType = async (req, res) => {
  const id = req.params.id;
  const { name, date, description } = req.body;
  try {
    await FruitType.findByIdAndUpdate(id, { name, date, description });
    res.status(200).json({ message: "Fruit updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  addFruitType,
  getAllFruitTypes,
  getOneFruitType,
  deleteFruitType,
  updateFruitType,
};
