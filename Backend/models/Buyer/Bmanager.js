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
        type: String,
        required: true,
    },

    quality: {
        type: String,
        required: true,
    },

    date: {
        type: String,
        required: true,
    },

   
});

module.exports = mongoose.model("Request", requestschema);

