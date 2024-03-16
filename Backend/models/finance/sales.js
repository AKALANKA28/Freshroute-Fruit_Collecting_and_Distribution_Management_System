const mongoose = require('mongoose');



const salesSchema = mongoose.Schema({
    customer_name : {
        type : String,
        required: true,
        trim: true
    },

    date: {
        type: Date,
        required: true
    },

    fruit_name: {
        type: String,
        required: true
    },

    amount: {
        type: Number,
        required: true
    },

    paid: {
        type: Number,
        required: true
    },

    due: {
        type: Number,
        required: true
    },

    status: {
        type: String,
        required: true
    },
   
})

const Sales = mongoose.model("sales", salesSchema);

module.exports = Sales;