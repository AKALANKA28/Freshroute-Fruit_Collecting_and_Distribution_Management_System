const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const addvehicleSchema = new Schema({

    vehicle_no: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    conditions: {
        type: String,
        required: true
    },


    capacity: {
        type: Number,
        required: true
    },

    owner_name : {
        type : String,
        required: true,
        trim: true
    },

    NIC: {
        type: Number,
        required: true
    },

    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    acount_no: {
        type: Number,
        required: true
    },


   
})

const test = mongoose.model("addvehicle", addvehicleSchema);

module.exports = addvehicle;