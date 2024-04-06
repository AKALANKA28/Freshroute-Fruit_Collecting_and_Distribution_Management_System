const mongoose = require('mongoose');

const ExecutionHistorySchema = mongoose.Schema({
    
    supplier: String,
    
    execNo: Number,

    execQuantity: Number,

    filledQuantity: Number,

    execTime: Date,

});


const OrderExecutionDetailSchema = mongoose.Schema({
    orderId: {
        type : String,
        required: true,
    },
    opName : {
        type : String,
        required: true,   
    },

    customer : {
        type : String,
        required: true,   
    },

    fruitCategory: {
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
    },
    executionHistory:[ExecutionHistorySchema]
   
});

const OrderExecutionDetail = mongoose.model("OrderExecutionDetail", OrderExecutionDetailSchema);

module.exports = OrderExecutionDetail;







