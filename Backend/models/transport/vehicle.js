const mongoose = require('mongoose');



const vehicle = mongoose.Schema({
    vehicle_no: {
        type: Number,
        required: true
    },
    type: {
        type : String,
        required: true,
        trim: true
    },

    conditions: {
        type: String,
        required: true
    },

    capacity: {
        type: Number,
        required: true
    },

    owner_name: {
        type: String,
        required: true
    },
    owner_name: {
        type: String,
        required: true
    },
    nic: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    account_no: {
        type: Number,
        required: true
    },
   
})

const vehicles = mongoose.model("vehicle", vehicle);

module.exports = vehicles;