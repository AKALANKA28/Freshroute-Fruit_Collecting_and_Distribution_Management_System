const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const farmerSchema = new Schema({
    
    farmerId : {
        type : String,
        required: true
    },

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
   
})

const farmers = mongoose.model("farmers", farmerSchema);

module.exports = farmers;