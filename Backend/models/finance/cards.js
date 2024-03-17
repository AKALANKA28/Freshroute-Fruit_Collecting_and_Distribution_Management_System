const mongoose = require('mongoose');



const cardSchema = mongoose.Schema({
    name : {
        type : String,
        required: true,
        trim: true
    },

    icon: {
        type: String,
        required: true
    },

    amount: {
        type: Number,
        required: true
    },

    percentage: {
        type: Number,
        required: true
    },

    active: {
        type: Boolean,
        required: true
    },
  
   
})

const Card = mongoose.model("card", cardSchema);

module.exports = Card;