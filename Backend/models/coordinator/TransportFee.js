// .Backend/models/coordinator/TransportFee.js
const mongoose = require("mongoose");

const TransportFeeSchema = new mongoose.Schema({
  vehicletype: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  maxweight: {
    type: Number,
    required: true,
  },
  pricepkm: {
    type: Number,
    required: true,
  },
});

const TransportFee = mongoose.model("TransportFee", TransportFeeSchema);

module.exports = TransportFee;
