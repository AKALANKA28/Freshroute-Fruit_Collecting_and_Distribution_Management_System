const mongoose = require("mongoose");

const vehicle = mongoose.Schema({
  vehicle_no: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    trim: true,
  },

  conditions: {
    type: String,
    // required: true,
  },

  capacity: {
    type: Number,
    required: true,
  },

  owner_name: {
    type: String,
    required: true,
  },

  // nic: {
  //   type: String,
  //   required: true,
  // },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  Bank: {
    type: String,
    required: true,
  },
  Branch: {
    type: String,
    required: true,
  },
  account_no: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
  },

  amount: {
    type: Number,
    default: 50000
  },

  paid: {
    type: Boolean,
    default: false, // Default value is false, indicating payment not made
  },
});

const vehicles = mongoose.model("vehicle", vehicle);

module.exports = vehicles;
