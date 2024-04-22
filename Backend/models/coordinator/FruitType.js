const mongoose = require("mongoose");

const FruitTypeSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const FruitType = mongoose.model("FruitType", FruitTypeSchema);

module.exports = FruitType;
