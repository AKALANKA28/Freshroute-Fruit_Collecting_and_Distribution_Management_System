//C:\Users\HP\Documents\GitHub\MERN_Project\Backend\models\q_and_o\qualityModel.js

const mongoose = require('mongoose');

const qualitySchema = mongoose.Schema({
    fruit_category : {
        type : String,
        required: true,
       
    },

    grade: {
        type: String,
        required: true
    },

    quality_desc: {
        type: String,
        required: true
    },

    storage_cond: {
        type: String,
        required: true
    },

    
})

const Quality = mongoose.model("quality", qualitySchema);

module.exports = Quality;