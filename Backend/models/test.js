const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const testSchema = new Schema({
    name : {
        type : String,
        required: true,
        trim: true
    },

    age: {
        type: Number,
        required: true
    },

    gender: {
        type: String,
        required: true
    },

   
})

const test = mongoose.model("test", testSchema);

module.exports = test;