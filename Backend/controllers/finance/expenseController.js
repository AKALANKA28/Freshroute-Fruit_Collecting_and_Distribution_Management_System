const {
  updateRevenueOnExpenseAdd,
} = require("../../middlewares/revenueUpdate");
const Expense = require("../../models/finance/expense");

// Add a new expense record
exports.addExpense = async (req, res, next) => {
  try {
    const { date, category, amount, description } = req.body;

    const newExpense = new Expense({
      date,
      category,
      amount,
      description,
    });

    await newExpense.save();
    // Call the middleware without passing `next`
    // await updateRevenueOnExpenseAdd(req, res);
    res.json("Expense Added");
  } catch (err) {
    if (err.name === "ValidationError") {
      // Extract validation error messages
      const errorMessages = Object.values(err.errors).map(
        (error) => error.message
      );
      return res
        .status(400)
        .json({ status: "Validation Error", errors: errorMessages });
    } else {
      console.log(err);
      res
        .status(500)
        .json({ status: "Error adding expense record", error: err.message });
    }
  }
};

// Retrieve all expense records
exports.getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.json(expenses);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ status: "Error retrieving expense records", error: err.message });
  }
};

// Retrieve a specific expense record by ID
exports.getExpenseById = async (req, res) => {
  try {
    const ExpenseId = req.params.id;
    const expense = await Expense.findById(ExpenseId);

    if (!expense) {
      return res.status(404).json({ status: "Expense not found" });
    }

    res.status(200).json({ status: "Expense fetched", expense });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ status: "Error retrieving Expense record", error: err.message });
  }
};

// Update a expense record
exports.updateExpense = async (req, res) => {
  try {
    const expenseId = req.params.id;
    const { date, category, amount, description } = req.body;

    const updateExpense = {
      date, // Convert date string to Date object
      category,
      amount,
      description,
    };

    const updatedExpense = await Expense.findByIdAndUpdate(
      expenseId,
      updateExpense,
      { new: true }
    );

    if (!updatedExpense) {
      return res.status(404).json({ status: "Expense not found" });
    }

    res.status(200).json({ status: "Expense record updated", updatedExpense });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ status: "Error updating expense record", error: err.message });
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
    res
      .status(500)
      .json({ status: "Error deleting Expense record", error: err.message });
  }
};
