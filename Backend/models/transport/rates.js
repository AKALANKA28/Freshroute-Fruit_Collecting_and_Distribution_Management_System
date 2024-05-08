const mongoose = require('mongoose');



const rates = mongoose.Schema({

    vehicle_no: {
        type: String,
        required: true
    },
    owner_name : {
        type : String,
        required: true,
        trim: true
    },
    
})

const rate = mongoose.model("rates", rates);

module.exports = rate;