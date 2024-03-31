const mongoose = require('mongoose');

const qualitySchema = mongoose.Schema({
    
    fruitCategory : {
        type : String,
        required: true,  
    },

    grade: {
        type: String,
        required: true
    },

    qualityDesc: {
        type: String,
        required: true
    },

    storageCond: {
        type: String,
        required: true
    },

    
})

const Quality = mongoose.model("quality", qualitySchema);

module.exports = Quality;