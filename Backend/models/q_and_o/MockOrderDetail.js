const mongoose = require('mongoose');

const MockOrderDetailSchema = mongoose.Schema({

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

    placedDate: {
        type: Date,
        required: true
    },

    dueDate: {
        type: Date,
        required: true
    },

    orderStatus: {   // PENDING  ASSIGNED IN_PROGRESS  COMPLETED
        type: String,
        required: true,
        default: "PENDING",
    }
    
})

const MockOrderDetail = mongoose.model("MockOrderDetail", MockOrderDetailSchema);

module.exports = MockOrderDetail;
