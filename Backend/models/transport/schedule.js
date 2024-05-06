const mongoose = require('mongoose');



const schedule = mongoose.Schema({

    schedule_ID: {
        type: Number,
        required: true
    },

    image: {
        type: String,
    }, 

    vehicle_no: {
        type: String,
        required: true
    },

    driver_name : {
        type : String,
        required: true,
        trim: true
    },
     pickup_location: {
        type : String,
        required: true,
        trim: true
    },
    destination : {
        type : String,
        required: true,
        trim: true
    },

    date: {
        type: Date,
        required: true
    },

    quantity: {
        type: Number,
        required: true
    },
   
})

const schedules = mongoose.model("schedule", schedule);

module.exports = schedules;