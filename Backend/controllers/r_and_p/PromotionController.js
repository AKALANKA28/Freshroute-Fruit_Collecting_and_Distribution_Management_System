// ./Backend\controllers\r_and_p\PromotionController.js
const Promotion = require("../../models/r_and_p/Promotion");

const addPromotion = async (req, res) => {
  const { farmer_name, nic, location, application_no } = req.body;
  try {
    const newPromotion = await Promotion.create({ farmer_name, nic, location, application_no });
    res.json("New Promotion Added");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllPromotions = async (req, res) => {
  try {
    const promotions = await Promotion.find();
    res.json(promotions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getOnePromotion = async (req, res) => {
  const id = req.params.id;
  try {
    const onePromotion = await Promotion.findById(id);
    res.status(200).json(onePromotion);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deletePromotion = async (req, res) => {
  const id = req.params.id;
  try {
    await Promotion.findByIdAndDelete(id);
    res.status(200).json({ message: "Promotion Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updatePromotion = async (req, res) => {
  const id = req.params.id;
  const { farmer_name, nic, location, application_no } = req.body;
  try {
    await Promotion.findByIdAndUpdate(id, { farmer_name, nic, location, application_no });
    res.status(200).json({ message: "Promotion Updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  addPromotion,
  getAllPromotions,
  getOnePromotion,
  deletePromotion,
  updatePromotion,
};
