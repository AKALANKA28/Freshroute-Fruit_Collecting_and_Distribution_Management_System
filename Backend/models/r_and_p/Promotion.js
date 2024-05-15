const mongoose = require('mongoose');



const PromotionSchema = mongoose.Schema({
    farmer_name : {
        type : String,
        required: true,
    },

    location: {
        type: String,
        required: true
    },

    application_no: {
        type: String,
        required: true
    },

    required_resouce: {
        type: String,
        required: true
    },

    
   
})

const Promotion = mongoose.model("promotion", PromotionSchema);

module.exports = Promotion;