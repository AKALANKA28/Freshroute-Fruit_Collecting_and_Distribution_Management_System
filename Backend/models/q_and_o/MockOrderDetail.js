const mongoose = require('mongoose');

const MockOrderDetailSchema = mongoose.Schema({


    customerId : {
        type : String,
        required: true,   
    },

    customerName : {
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
    
    assignedDate: {
        type: Date,
        required: true
    },

    orderStatus: {   // PENDING  ASSIGNED IN_PROGRESS  COMPLETED
        type: String,
        required: true,
        default: "PENDING",
    },
    opName: String,
    opId: String
})

const MockOrderDetail = mongoose.model("MockOrderDetail", MockOrderDetailSchema);

module.exports = MockOrderDetail;
