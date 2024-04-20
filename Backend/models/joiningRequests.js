const mongoose = require("mongoose");

var JoiningRequestSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  NIC: {
    type: String,
    required: true,
  },
  landAddress: {
    type: String,
    required: true,
  },
  fieldArea: {
    type: String,
    required: true,
  },
  landDeedUrl: {
    type: String,
  },
//   status: {
//     type: String,
//     enum: ['approved', 'pending', 'declined'],
//     default: 'pending'
// }
});

const JoiningRequest = mongoose.model("JoiningRequest", JoiningRequestSchema);

module.exports = JoiningRequest;
