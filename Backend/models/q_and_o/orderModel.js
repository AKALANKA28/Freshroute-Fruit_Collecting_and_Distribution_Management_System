const mongoose = require('mongoose');

const executionHistory = mongoose.Schema({
    
    supplier: String,
    
    execNo: Number,

    execQuantity: Number,
        
    filledQuantity: Number,
       
    execTime: Date,

});


const orderSchema = mongoose.Schema({
    
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
    executionHistory:[executionHistory]
   
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;







