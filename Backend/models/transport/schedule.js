const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const scheduleSchema = new Schema({

    schedule_ID: {
        type: Number,
        required: true
    },

    vehicle_no: {
        type: Number,
        required: true
    },
    driver_name: {
        type: String,
        required: true
    },
    pickup_location: {
        type: String,
        required: true
    },

    destination: {
        type : String,
        required: true,
    
    },

    date: {
        type : Date,
        required: true,
        
    },
    time: {
        type : String,
        required: true,
    
    },

    quantity: {
        type: Number,
        required: true
    },

})

const makeschedule = mongoose.model("schedule", scheduleSchema);

module.exports = makeschedule;