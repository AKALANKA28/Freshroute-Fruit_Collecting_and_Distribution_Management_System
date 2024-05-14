const mongoose = require('mongoose');

const expenseSchema = mongoose.Schema({
    date: {
        type: String,
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

    category: {
        type: String,
        required: true,
        enum: ['Transport', 'Employee', 'Research', 'Promotion', 'Payments']
      
    },

    amount: {
        type: Number,
        required: true,
        min: [0, 'Amount cannot be negative'] 
    },

    description: {
        type: String,
        minlength: [5, 'Description must be at least 5 characters long'] 
    }
});

const Expense = mongoose.model("expense", expenseSchema);

module.exports = Expense;
