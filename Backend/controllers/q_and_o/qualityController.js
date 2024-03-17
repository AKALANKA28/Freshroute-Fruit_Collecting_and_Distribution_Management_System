//C:\Users\HP\Documents\GitHub\MERN_Project\Backend\controllers\q_and_o\qualityController.js

const quality = require('../../models/q_and_o/qualityModel');

// Add a new quality record
exports.addQuality = async (req, res) => {
    try {
        const { fruit_category,  grade, quality_desc, storage_cond,  } = req.body;

        const newQuality = new quality({
            fruit_category,
            grade,
            quality_desc,
            storage_cond,
            
        });

        await newQuality.save();
        res.json("Quality Added");
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "Error adding quality record", error: err.message });
    }
};

// Retrieve all quality records
exports.getAllqualities = async (req, res) => {
    try {
        const quality = await quality.find();
        res.json(quality);
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "Error retrieving quality records", error: err.message });
    }
};

// Retrieve a specific quality record by ID
exports.getQualityById = async (req, res) => {
    try {
        const qualityId = req.params.id;
        const quality = await quality.findById(qualityId);
        
        if (!quality) {
            return res.status(404).json({ status: "Quality not found" });
        }
        
        res.status(200).json({ status: "quality fetched", quality });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "Error retrieving quality record", error: err.message });
    }
};

// Update a quality record
exports.updateQuality = async (req, res) => {
    try {
        const qualityId = req.params.id;
        const { fruit_category,  grade, quality_desc, storage_cond,  } = req.body;

        const updateQuality = {
            fruit_category,
            grade,
            quality_desc,
            storage_cond,
            
            
            
        };

        const updatedQuality = await quality.findByIdAndUpdate(qualityId, updateQuality, { new: true });

        if (!updatedQuality) {
            return res.status(404).json({ status: "Quality not found" });
        }

        res.status(200).json({ status: "Quality record updated", updatedQuality });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "Error updating quality record", error: err.message });
    }
};

// Delete a quality record
exports.deleteQuality = async (req, res) => {
    try {
        const qualityId = req.params.id;
        await quality.findByIdAndDelete(qualityId);
        res.status(200).json({ status: "Quality record deleted" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "Error deleting quality record", error: err.message });
    }
};
