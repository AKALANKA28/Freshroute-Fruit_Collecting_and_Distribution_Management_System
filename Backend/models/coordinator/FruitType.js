// .Backend/models/coordinator/FruitType.js
const mongoose = require("mongoose");

const FruitTypeSchema = new mongoose.Schema({
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
