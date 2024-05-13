mongoose = require("mongoose");

const FarmerSchema = new mongoose.Schema({
  
    NIC : {
        type : String,
    },
    username : {
        type : String,
    },
    name : {
        type : String,
        required: true,
    },
    email : {
        type : String,
        required: true,
    },
    mobile : {
        type : String,
    },
    city : {
        type : String,
        required: true,
    },
    latitude: {
        type: String,
    }, 
    longitude: {
        type: String,
    },
    lane: {
        type: String,
    },
    landAddress: {
        type: String,
    },
    fieldArea: {
        type: String,
    },
    landDeedUrl: {
        type: String,
    },
    joinRequestId : {
        type : String,
    },
});

const Farmer = mongoose.model("Farmer", FarmerSchema);

module.exports = Farmer;