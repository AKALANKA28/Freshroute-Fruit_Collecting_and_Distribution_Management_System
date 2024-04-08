const mongoose = require("mongoose");

const FarmerJoiningRequestsSchema = new mongoose.Schema({
  NIC: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  email: {
   type: String,
   required: true
 },
  city: {
    type: String,
    required: true
  },
  fieldArea: {
    type: Number,
    required: true
  },
  landDeed: {
    type: String,
    required: true
  }
});

const FarmerJoiningRequest = mongoose.model("FarmerJoiningRequest", FarmerJoiningRequestsSchema);

module.exports = FarmerJoiningRequest;