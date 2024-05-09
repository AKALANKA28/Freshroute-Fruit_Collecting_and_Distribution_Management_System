const Sales = require('../../models/finance/sales');

// Add a new sales record
exports.addSale = async (req, res) => {

    try {
        const { customer_name, date, fruit_name, amount, paid, due, status } = req.body;

        const newSale = new Sales({
            customer_name,
            date,
            fruit_name,
            amount,
            paid,
            due,
            status
        });
        await newSale.validate(); // Validate the schema

        await newSale.save();
        
        res.json("Sales Added");
    } catch (err) {
        if (err.name === 'ValidationError') {
            const errorMessage = Object.values(err.errors).map(error => error.message).join(', ');
            res.status(400).json({ error: errorMessage });
        } else {
            console.log(err);
            res.status(500).json({ status: "Error adding sales record", error: err.message });
        }
    }
};

// Retrieve all sales records
exports.getAllSales = async (req, res) => {
    try {
        const sales = await Sales.find();
        res.json(sales);
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "Error retrieving sales records", error: err.message });
    }
};

// Retrieve a specific sales record by ID
exports.getSaleById = async (req, res) => {
    try {
        const salesId = req.params.id;
        const sale = await Sales.findById(salesId);
        
        if (!sale) {
            return res.status(404).json({ status: "Sale not found" });
        }
        
        res.status(200).json({ status: "Sale fetched", sale });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "Error retrieving sales record", error: err.message });
    }
};

// Update a sales record
exports.updateSale = async (req, res) => {
    try {
        const saleId = req.params.id;
        const { customer_name, date, fruit_name, amount, paid, due, status } = req.body;

        const updateSale = {
            customer_name,
            date,
            fruit_name,
            amount,
            paid,
            due,
            status
        };

        const updatedSale = await Sales.findByIdAndUpdate(saleId, updateSale, { new: true });

        if (!updatedSale) {
            return res.status(404).json({ status: "Sale not found" });
        }

        res.status(200).json({ status: "Sale record updated", updatedSale });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "Error updating sales record", error: err.message });
    }
};

// Delete a sales record
exports.deleteSale = async (req, res) => {
    try {
        const salesId = req.params.id;
        await Sales.findByIdAndDelete(salesId);
        res.status(200).json({ status: "Sales record deleted" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "Error deleting sales record", error: err.message });
    }
};


