const mongoose = require("mongoose");

const PredictionSchema = new mongoose.Schema({
    fruit: {
        type: String,
        required: true
    },
    subCategory: {
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
    price: {
        type: String,
        required: true
    },
    dateCanBeGiven: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['approved', 'pending', 'declined'],
        default: 'pending'
    }
});

const Prediction = mongoose.model("Prediction", PredictionSchema);

module.exports = Prediction;