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
        type: String ,
        required: true,
    },

    quality: {
        type: String,
        required: true,
    },
    
    orderStatus: {
        type: String,
        default: "REQUEST", // Set the default value here
    },

    date: {
        type: String, // order placed date
        required: true,
    },
    
    datetobe: {
        type: String, //  date to be delivered
        required: true,
    }, 

});

module.exports = mongoose.model("Request", requestschema);
