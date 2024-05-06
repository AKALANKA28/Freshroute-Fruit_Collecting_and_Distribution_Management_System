const mongoose = require("mongoose");

const FruitDetailSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
  },
  fruit: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
  },
  quality: {
    type: String,
  },
  qualityDesc: {
    type: String,
  },
  storageCond: {
    type: String,
  },
  qualityStatus: {
    // 0 - quality has not defined     1 - quality has defined
    type: Number,
    required: true,
    default: 0,
  },
});

const FruitDetail = mongoose.model("FruitDetail", FruitDetailSchema);

module.exports = FruitDetail;
