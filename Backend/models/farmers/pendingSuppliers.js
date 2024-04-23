mongoose = require("mongoose");

const PendingSupplierSchema = new mongoose.Schema({
  
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
      joinRequestId: {
        type: String,
        required: true,
      }
});

const PendingSupplier = mongoose.model("PendingSupplier", PendingSupplierSchema);

module.exports = PendingSupplier;