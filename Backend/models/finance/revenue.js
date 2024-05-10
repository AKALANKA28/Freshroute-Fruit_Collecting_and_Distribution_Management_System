const mongoose = require('mongoose');

const revenueSchema = mongoose.Schema({
    totalSales: {
        type: Number,
        required: true,
        default: 0 // Default value set to 0
    },
    totalExpenses: {
        type: Number,
        required: true,
        default: 0 // Default value set to 0
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    totalRevenue: {
        type: Number,
        required: true,
        default: 0 // Default value set to 0
    }
});

const Revenue = mongoose.model("Revenue", revenueSchema);

module.exports = Revenue;
