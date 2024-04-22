const mongoose = require('mongoose');

const requestschema = new mongoose.Schema({

    rname : {
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

    quantity: {
        type: String ,//
        required: true,
    },

    quality: {
        type: String,
        required: true,
    },

    date: {
        type: String, //date to be delivered 
        required: true,
    },

//     placedDate: {
//         type: Date,
//         required: true
//     },

//     assignedDate: {
//         type: Date,
//         required: true
//     },

//     customerId : {
//         type : String,
//         required: true,   
//     },

//     customerName : {
//         type : String,
//         required: true,   
//     },

//     orderStatus: {   // PENDING  ASSIGNED IN_PROGRESS  COMPLETED
//         type: String,
//         required: true,
//         default: "PENDING",
//     },
//     opName: String,
//     opId: String
   
});

module.exports = mongoose.model("Request", requestschema);

