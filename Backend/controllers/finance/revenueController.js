const ProductOrder = require('../../models/orderModel.js');
const Expense = require('../../models/finance/expense.js');
const Revenue = require('../../models/finance/revenue.js');

// async function calculateRevenue() {
//     try {
//         const sales = await Sales.find({});
//         const totalSales = sales.reduce((acc, curr) => acc + curr.amount, 0);

//         const expenses = await Expense.find({});
//         const totalExpenses = expenses.reduce((acc, curr) => acc + curr.amount, 0);

//         const newRevenue = new Revenue({ totalSales, totalExpenses });
//         await newRevenue.save();
//         console.log("Revenue calculated and saved successfully!");
//     } catch (err) {
//         console.error("Error calculating and saving revenue:", err);
//     }
// }



exports.calculateRevenue = async (req, res) => {
    try {

          // Fetch all product orders
          const orders = await ProductOrder.find({});

          // Filter paid orders
          const paidOrders = orders.filter(order => order.orderStatus === 'Paid');
  
          // Calculate total sales
          const totalSales = paidOrders.reduce((acc, curr) => acc + curr.totalPrice, 0);
          
        const expenses = await Expense.find({});
        const totalExpenses = expenses.reduce((acc, curr) => acc + curr.amount, 0);

        // Calculate total revenue
        const totalRevenue = totalSales - totalExpenses;

        // Create a new Revenue instance with total sales, total expenses, and total revenue
        const newRevenue = new Revenue({ totalSales, totalExpenses, totalRevenue });

        await newRevenue.save();
        console.log("Revenue calculated and saved successfully!");
        res.json(newRevenue);
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "Error retrieving expense records", error: err.message });
    }
};


// Delete all revenue records
exports.deleteAllRevenue = async (req, res) => {
    try {
        await Revenue.deleteMany({});
        res.status(200).json({ status: "All revenue records deleted" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "Error deleting all revenue records", error: err.message });
    }
};


// Call the function whenever needed
// calculateRevenue();
