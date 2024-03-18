mongoose = require("mongoose");

const FarmerSchema = new mongoose.Schema({
  
    NIC : {
        type : String,
        required: true
    },

    username : {
        type : String,
        required: true
    },

    name : {
        type : String,
        required: true
    },

    email : {
        type : String,
        required: true
    },

    city : {
        type : String,
        required: true
    },

    lane: {
        type: String,
        required: true
    },
});

const Farmer = mongoose.model("Farmer", FarmerSchema);

module.exports = Farmer;