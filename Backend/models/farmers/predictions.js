mongoose = require("mongoose");

const PredictionSchema = new mongoose.Schema({

    fruitType : {
        type : String,
        required: true
    },

    quality : {
        type : String,
        required: true
    },

    quantity : {
        type : Number,
        required: true
    },

    price : {
        type : String,
        required: true
    },

    dateCanBeGiven : {
        type : String,
        required: true
    },
});

const Prediction = mongoose.model("Prediction", PredictionSchema);

module.exports = Prediction;