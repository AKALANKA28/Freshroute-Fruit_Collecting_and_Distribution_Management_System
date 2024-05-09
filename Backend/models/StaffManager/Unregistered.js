const mongoose = require("mongoose");

const UnregisteredSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
  },
  name: {
    type: String,
  },
  jobrole: {
    type: String,
  },
  nic: {
    type: String,
  },
  address: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  accno: {
    type: Number,
  },
  bankname: {
    type: String,
  },
  fileUrl: {
    type: String,
  },
  joineddate: {
    type: String,
  },
  salary: {
    type: Number,
  },

  allowance: {
    type: Number,
  },

  epfe: {
    type: Number,
  },

  epfr: {
    type: Number,
  },

  etf: {
    type: Number,
  },

  netsalary: {
    type: Number,
  },
});

const Unregistered = mongoose.model("Unregistered", UnregisteredSchema);

module.exports = Unregistered;
