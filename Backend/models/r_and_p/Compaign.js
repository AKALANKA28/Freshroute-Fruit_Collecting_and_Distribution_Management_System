// ./Backend/models/r_and_p/Compaign.js
const mongoose = require("mongoose");

const CompaignSchema = new mongoose.Schema({
  compaign_title: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  objective: {
    type: String,
    required: true,
  },
  target_aud: {
    type: String,
    required: true,
  },
  budjet: {
    type: String,
    required: true,
  },
});

const Compaign = mongoose.model("Compaign", CompaignSchema);

module.exports = Compaign;
