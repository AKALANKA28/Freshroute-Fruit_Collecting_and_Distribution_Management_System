const Quality = require('../../models/q_and_o/qualityModel.js');

// Add a new quality record
exports.addQuality = async (req, res) => {
    try {
        const { fruitCategory, grade, qualityDesc, storageCond } = req.body;

        const newQuality = new Quality({
            fruitCategory,
            grade,
            qualityDesc,
            storageCond
        });

        await newQuality.save();
        res.json("Quality Added");
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "Error adding quality record", error: err.message });
    }
};

// Retrieve all quality records
exports.getAllQualities = async (req, res) => {
    try {
        const allQualities = await Quality.find();
        console.log(allQualities);
        res.json(allQualities);
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "Error retrieving quality records", error: err.message });
    }
};

// Retrieve a specific quality record by ID
exports.getQualityById = async (req, res) => {
    try {
        const qualityId = req.params.id;
        const foundQuality = await Quality.findById(qualityId);
        
        if (!foundQuality) {
            return res.status(404).json({ status: "Quality not found" });
        }
        
        res.status(200).json({ status: "Quality fetched", quality: foundQuality });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "Error retrieving quality record", error: err.message });
    }
};

// Update a quality record
exports.updateQuality = async (req, res) => {
    try {
        const qualityId = req.params.id;
        const { fruitCategory, grade, qualityDesc, storageCond } = req.body;

        const updateQuality = {
            fruitCategory,
            grade,
            qualityDesc,
            storageCond
        };

        const updatedQuality = await Quality.findByIdAndUpdate(qualityId, updateQuality, { new: true });

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
        await Quality.findByIdAndDelete(qualityId);
        res.status(200).json({ status: "Quality record deleted" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "Error deleting quality record", error: err.message });
    }
};
