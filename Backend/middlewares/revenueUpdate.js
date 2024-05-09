const Revenue = require('../models/finance/revenue');

// Middleware function to update total revenue when adding a new sales record
exports.updateRevenueOnSalesAdd = async (req, res, next) => {
    try {
        // Get the amount from the request body
        const { amount } = req.body;

        // Find the latest revenue record
        const latestRevenue = await Revenue.findOne().sort({ date: -1 });

        // Calculate the new total revenue
        const totalRevenue = latestRevenue ? latestRevenue.totalRevenue + amount : amount;

        // Create or update the revenue record
        if (latestRevenue) {
            latestRevenue.totalSales += amount;
            latestRevenue.totalRevenue = totalRevenue;
            await latestRevenue.save();
        } else {
            const newRevenue = new Revenue({ totalSales: amount, totalExpenses: 0, totalRevenue });
            await newRevenue.save();
        }

        next(); // Proceed to the next middleware or route handler
    } catch (err) {
        console.error("Error updating revenue on adding sales record:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Middleware function to update total revenue when adding a new expense record
exports.updateRevenueOnExpenseAdd = async (req, res, next) => {
    try {
        // Get the amount from the request body
        const { amount } = req.body;

        // Find the latest revenue record
        const latestRevenue = await Revenue.findOne().sort({ date: -1 });

        // Calculate the new total revenue
        const totalRevenue = latestRevenue ? latestRevenue.totalRevenue - amount : -amount;

        // Create or update the revenue record
        if (latestRevenue) {
            latestRevenue.totalExpenses += amount;
            latestRevenue.totalRevenue = totalRevenue;
            await latestRevenue.save();
        } else {
            const newRevenue = new Revenue({ totalSales: 0, totalExpenses: amount, totalRevenue });
            await newRevenue.save();
        }

        next(); // Proceed to the next middleware or route handler
    } catch (err) {
        console.error("Error updating revenue on adding expense record:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};