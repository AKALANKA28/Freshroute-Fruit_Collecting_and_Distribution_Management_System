import Category from "../../../models/finance/payments/category.js";
import expressAsyncHandler from "express-async-handler";


// Add a new Category record
exports.addCategory = async (req, res) => {
    try {
        const { date, category, amount, description,} = req.body;

        const newCategory = new Category({
            date: new Date(date), // Convert date string to Date object
            category,
            amount,
            description,

        });


        await newCategory.save();
        res.json("Category Added");
    } catch (err) {
        if (err.name === 'ValidationError') {
            // Extract validation error messages
            const errorMessages = Object.values(err.errors).map(error => error.message);
            return res.status(400).json({ status: "Validation Error", errors: errorMessages });
        } else {
            console.log(err);
            res.status(500).json({ status: "Error adding Category record", error: err.message });
        }
    }
};

// Retrieve all Category records
exports.getAllCategorys = async (req, res) => {
    try {
        const Categorys = await Categorys.find();
        res.json(Categorys);
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "Error retrieving Category records", error: err.message });
    }
};

// Retrieve a specific Category record by ID
exports.getCategoryById = async (req, res) => {
    try {
        const CategoryId = req.params.id;
        const sale = await Category.findById(CategoryId);
        
        if (!sale) {
            return res.status(404).json({ status: "Category not found" });
        }
        
        res.status(200).json({ status: "Category fetched", sale });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "Error retrieving Category record", error: err.message });
    }
};

// Update a Category record
exports.updateCategory = async (req, res) => {
    try {
        const CategoryId = req.params.id;
        const { date, category, amount, description, } = req.body;

        const updateCategory = {
            date: new Date(date), // Convert date string to Date object
            category,
            amount,
            description,
        };

        const updatedCategory = await category.findByIdAndUpdate(CategoryId, updateCategory, { new: true });

        if (!updatedCategory) {
            return res.status(404).json({ status: "Category not found" });
        }

        res.status(200).json({ status: "Category record updated", updatedCategory });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "Error updating Category record", error: err.message });
    }
};

// Delete a Category record
exports.deleteCategory = async (req, res) => {
    try {
        const CategoryId = req.params.id;
        await Category.findByIdAndDelete(CategoryId);
        res.status(200).json({ status: "Category record deleted" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "Error deleting Category record", error: err.message });
    }
};
