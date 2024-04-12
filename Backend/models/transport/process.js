const mongoose = require('mongoose');



const process = mongoose.Schema({

    process_ID: {
        type: Number,
        required: true
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
    current_status: {
        type : String,
        required: true,
        trim: true
    },
   
   
})

const processes = mongoose.model("process", process);

module.exports = processes;