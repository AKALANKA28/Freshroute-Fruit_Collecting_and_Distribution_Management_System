const AcceptedSupply = require("../../models/farmers/acceptedSupplies");

const addAcceptedSupply = async (req, res) => {
  const { fruit, subCategory, quality, quantity, price, dateCanBeGiven, predictionID } = req.body;
  try {
    const newAcceptedSupply = await AcceptedSupply.create({ fruit, subCategory, quality, quantity, price, dateCanBeGiven, predictionID });
    res.json("New Supply Added");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllAcceptedSupplies = async (req, res) => {
  try {
    const acceptedSupplies = await AcceptedSupply.find();
    res.json(acceptedSupplies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getOneAcceptedSupply = async (req, res) => {
  const id = req.params.id;
  try {
    const acceptedSupply = await AcceptedSupply.findById(id);
    res.status(200).json(acceptedSupply);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteAcceptedSupply = async (req, res) => {
  const id = req.params.id;
  try {
    await AcceptedSupply.findByIdAndDelete(id);
    res.status(200).json({ message: "Supply Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateAcceptedSupply = async (req, res) => {
  const id = req.params.id;
  const { fruit, subCategory, quality, quantity, price, dateCanBeGiven, predictionID } = req.body;
  try {
    await AcceptedSupply.findByIdAndUpdate(id, { fruit, subCategory, quality, quantity, price, dateCanBeGiven, predictionID });
    res.status(200).json({ message: "Supply updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getTotalApprovedPrice = async (req, res) => {
  try {
    const pipeline = [
      {
        $project: {
          totalApprovedPrice: { $multiply: ["$quantity", "$price"] }
        }
      },
      {
        $group: {
          _id: null,
          totalApprovedPrice: { $sum: "$totalApprovedPrice" }
        }
      }
    ];

    const result = await AcceptedSupply.aggregate(pipeline);

    if (result.length > 0) {
      res.status(200).json({ totalApprovedPrice: result[0].totalApprovedPrice });
    } else {
      res.status(200).json({ totalApprovedPrice: 0 });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getTotalApprovedSuppliesCount = async (req, res) => {
  try {
    const count = await AcceptedSupply.countDocuments();
    res.status(200).json({ count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


module.exports = {
  addAcceptedSupply,
  getAllAcceptedSupplies,
  getOneAcceptedSupply,
  deleteAcceptedSupply,
  updateAcceptedSupply,
  getTotalApprovedPrice,
  getTotalApprovedSuppliesCount
};