const Prediction = require("../../models/farmers/predictions");
const AcceptedSupply = require("../../models/farmers/acceptedSupplies");

const addPrediction = async (req, res) => {
  const { fruit, subCategory, quality, quantity, price, dateCanBeGiven } = req.body;
  try {
    const newPrediction = await Prediction.create({ fruit, subCategory, quality, quantity, price, dateCanBeGiven });
    res.status(201).json(newPrediction); // Return the newly created prediction
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add prediction" });
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
  const { fruit, subCategory, quality, quantity, price, dateCanBeGiven } = req.body;
  try {
    await Prediction.findByIdAndUpdate(id, { fruit, subCategory, quality, quantity, price, dateCanBeGiven });
    res.status(200).json({ message: "Prediction updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const acceptPrediction = async (req, res) => {
  const id = req.params.id;
  try {
    const prediction = await Prediction.findByIdAndUpdate(id, { status: 'Approved' }, { new: true });
    if (!prediction) {
      return res.status(404).json({ message: "Prediction not found" });
    }
    res.status(200).json({ message: "Prediction Approved" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const declinePrediction = async (req, res) => {
  const id = req.params.id;
  try {
    const prediction = await Prediction.findByIdAndUpdate(id, { status: 'Declined' }, { new: true });
    if (!prediction) {
      return res.status(404).json({ message: "Prediction not found" });
    }
    res.status(200).json({ message: "Prediction Declined" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTotalPredictionsCount = async (req, res) => {
  try {
    const count = await Prediction.countDocuments();
    res.status(200).json({ count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getTotalEarnings = async (req, res) => {
  try {
    const totalEarnings = await Prediction.aggregate([
      {
        $match: { status: 'Approved' }
      },
      {
        $group: {
          _id: null,
          total: { $sum: { $multiply: [{ $toDouble: "$quantity" }, { $toDouble: { $toDecimal: "$price" } }] } }
        }
      }
    ]);

    res.status(200).json({ totalEarnings: totalEarnings.length ? totalEarnings[0].total : 0 });
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
  acceptPrediction,
  declinePrediction,
  getTotalPredictionsCount,
  getTotalEarnings,
};