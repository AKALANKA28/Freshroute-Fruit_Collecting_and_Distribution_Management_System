const Expense = require('../../models/finance/expense');


// Add a new expense record
exports.addExpense = async (req, res) => {
    try {
        const { customer_name, date, fruit_name, amount, paid, due, status } = req.body;

        const newExpense = new Expense({
            customer_name,
            date: new Date(date), // Convert date string to Date object
            fruit_name,
            amount,
            paid,
            due,
            status
        });

        await newExpense.save();
        res.json("Expense Added");
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "Error adding expense record", error: err.message });
    }
};

// Retrieve all expense records
exports.getAllExpenses = async (req, res) => {
    try {
        const Expense = await Expense.find();
        res.json(Expense);
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "Error retrieving expense records", error: err.message });
    }
};

// Retrieve a specific expense record by ID
exports.getExpenseById = async (req, res) => {
    try {
        const ExpenseId = req.params.id;
        const sale = await Expense.findById(ExpenseId);
        
        if (!sale) {
            return res.status(404).json({ status: "Sale not found" });
        }
        
        res.status(200).json({ status: "Sale fetched", sale });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "Error retrieving Expense record", error: err.message });
    }
};

// Update a expense record
exports.updateExpense = async (req, res) => {
    try {
        const expenseId = req.params.id;
        const { customer_name, date, fruit_name, amount, paid, due, status } = req.body;

        const updateExpense = {
            customer_name,
            date: new Date(date), 
            fruit_name,
            amount,
            paid,
            due,
            status
        };

        const updatedExpense = await Expense.findByIdAndUpdate(expenseId, updateExpense, { new: true });

        if (!updatedExpense) {
            return res.status(404).json({ status: "Expense not found" });
        }

        res.status(200).json({ status: "Expense record updated", updatedExpense });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "Error updating expense record", error: err.message });
    }
};

// Delete a expense record
exports.deleteExpense = async (req, res) => {
    try {
        const expenseId = req.params.id;
        await Expense.findByIdAndDelete(expenseId);
        res.status(200).json({ status: "Expense record deleted" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "Error deleting Expense record", error: err.message });
    }
};
