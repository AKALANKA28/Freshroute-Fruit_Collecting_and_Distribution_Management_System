const rates = require('../../models/transport/rates');

// Add a new covering record
exports.addrates = async (req, res) => {
    try {
        const {vehicle_no, owner_name} = req.body;

        const newRates = new rates({
            vehicle_no,
            owner_name,
           
        });

        await newRates.save();
        res.json("Rates Added");
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "Error adding rates record", error: err.message });
    }
};

// Retrieve all rates records
exports.getAllrates = async (req, res) => {
    try {
        const rates = await rates.find();
        res.json(rates);
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "Error retrieving rates records", error: err.message });
    }
};

// Retrieve a specific rates record by ID
exports.getratesById = async (req, res) => {
    try {
        const rateId = req.params.id
        const rates = await Process_status.findById(rateId);
        
        if (!rates) {
            return res.status(404).json({ status: "rates not found" });
        }
        
        res.status(200).json({ status: "rates fetched", rates });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "Error retrieving rates record", error: err.message });
    }
};

// Update a rates record
exports.updaterates = async (req, res) => {
    try {
        const rateId = req.params.id;
        const { vehicle_no, owner_name} = req.body;

        const updaterates = {
            vehicle_no,
            owner_name,
           
        };

        const updatedrates = await rates.findByIdAndUpdate(rateId, update, { new: true });

        if (!updatedrates) {
            return res.status(404).json({ status: "rates not found" });
        }

        res.status(200).json({ status: " rates updated", updatedrates });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "Error updating rates record", error: err.message });
    }
};

// Delete a rates record
exports.deleterates = async (req, res) => {
    try {
        const rateId = req.params.id;
        await rates.findByIdAndDelete(rateId);
        res.status(200).json({ status: "rates record deleted" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "Error deleting rates record", error: err.message });
    }
};
