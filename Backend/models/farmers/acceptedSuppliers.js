mongoose = require("mongoose");

const AcceptedSupplierSchema = new mongoose.Schema({
  
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
      }
});

const AcceptedSupplier = mongoose.model("AcceptedSupplier", AcceptedSupplierSchema);

module.exports = AcceptedSupplier;