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
    date: {
        type: Date,
        required: true,
        default: Date.now

        // validate: {
        //     validator: function(value) {
        //         // Check if date is not in the future
        //         return value <= new Date();
        //     },
        //     message: props => `${props.value} cannot be a future date!`
        // }
    },

    totalRevenue: {
        type: Number,
        required: true
    }
});

const Revenue = mongoose.model("Revenue", revenueSchema);

module.exports = Revenue;
