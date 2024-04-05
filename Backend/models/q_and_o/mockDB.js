const mongoose = require('mongoose');

const mockSchema = mongoose.Schema({
    

    customer : {
        type : String,
        required: true,   
    },

    fruit: {
        type: String,
        required: true,
    },

    category: {
        type: String,
        required: true,
    },

    quality: {
        type: String,
    },

    quantity: {
        type: Number,
        required: true
    },

    placed_date: {
        type: Date,
        required: true
    },

    due_date: {
        type: Date,
        required: true
    },

    order_status: {
        type: Number,
        required: true
    },


    
    
})

const MockOrder = mongoose.model("MockOrder", mockSchema);

module.exports = MockOrder;