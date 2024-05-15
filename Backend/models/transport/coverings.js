const mongoose = require('mongoose');



const coverings = mongoose.Schema({

    vehicle_no: {
        type: String,
        required: true
    },
    owner_name : {
        type : String,
        required: true,
        trim: true
    },
    total_coverings: {
        type: Number,
        required: true
    },
    date: {
        type : String,
        required: true,
        trim: true
    },
   
   
})

const covering = mongoose.model("coverings", coverings);

module.exports = covering;