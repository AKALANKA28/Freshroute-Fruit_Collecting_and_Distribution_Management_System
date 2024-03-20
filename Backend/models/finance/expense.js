const mongoose = require('mongoose');



const expenseSchema = mongoose.Schema({
    date : {
        type : Date,
        required: true,
    },

    category: {
        type: String,
        required: true
    },

    amount: {
        type: Number,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    
   
})

const Expense = mongoose.model("expense", expenseSchema);

module.exports = Expense;