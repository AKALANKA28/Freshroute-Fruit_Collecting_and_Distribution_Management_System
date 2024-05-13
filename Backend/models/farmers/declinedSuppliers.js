mongoose = require("mongoose");

const DeclinedSupplierSchema = new mongoose.Schema({
  
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
      latitude: {
        type: String,
      },
      longitude: {
        type: String,
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
      joinRequestId : {
        type : String,
        required: true
    },
});

const DeclinedSupplier = mongoose.model("DeclinedSupplier", DeclinedSupplierSchema);

module.exports = DeclinedSupplier;