const mongoose = require('mongoose');

const OrderExecutionDetailSchema = mongoose.Schema({
    orderId: {
        type : String,
        required: true,
    },
    opName : {
        type : String,
        required: true,   
    },
    opId : {
        type : String,
        required: true,
    },

    customer : {
        type : String,
        required: true,   
    },

    category: {
        type: String,
        required: true
    },

    quality: {
        type: String,
        required: true
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
    orderStatus: {   //  ASSIGNED IN_PROGRESS  COMPLETED
        type: String,
        required: true,
        default: "ASSIGNED",
    },
    executionHistory:[{}]
   
});

const OrderExecutionDetail = mongoose.model("OrderExecutionDetail", OrderExecutionDetailSchema);

module.exports = OrderExecutionDetail;







