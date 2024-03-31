const mongoose = require('mongoose');

const mockSchema = mongoose.Schema({
    

    customer : {
        type : String,
        required: true,   
    },

    fruit_category: {
        type: String,
        required: true
    },

    grade: {
        type: String,
        required: true
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
    
})

const MockOrder = mongoose.model("MockOrder", mockSchema);

module.exports = MockOrder;