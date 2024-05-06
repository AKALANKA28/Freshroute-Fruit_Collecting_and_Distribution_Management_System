const mongoose = require('mongoose');

const revenueSchema = mongoose.Schema({
    totalSales: {
        type: Number,
        required: true
    },
    totalExpenses: {
        type: Number,
        required: true
    },
    totalRevenue: {
        type: Number,
        required: true
    }
});

const Revenue = mongoose.model("Revenue", revenueSchema);

module.exports = Revenue;
