const coverings = require('../../models/transport/coverings');

// Add a new covering record
exports.addcoverings = async (req, res) => {
    try {
        const {vehicle_no, owner_name, total_coverings, date } = req.body;

        const newCoverings = new coverings({
            vehicle_no,
            owner_name,
            total_coverings,
            date,
        });

        await newCoverings.save();
        res.json("Coverings Added");
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "Error adding covering record", error: err.message });
    }
};

// Retrieve all covering records
exports.getAllcoverings = async (req, res) => {
    try {
        const covering = await coverings.find();
        res.json(covering);
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "Error retrieving covering records", error: err.message });
    }
};

// Retrieve a specific covering record by ID
exports.getcoveringsById = async (req, res) => {
    try {
        const coveringId = req.params.id
        const coverings = await Process_status.findById(coveringId);
        
        if (!coverings) {
            return res.status(404).json({ status: "coverings not found" });
        }
        
        res.status(200).json({ status: "coverings fetched", coverings });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "Error retrieving covering record", error: err.message });
    }
};

// Update a coverings record
exports.updatecoverings = async (req, res) => {
    try {
        const coveringId = req.params.id;
        const { vehicle_no, owner_name, total_coverings, date } = req.body;

        const updatecoverings = {
            vehicle_no,
            owner_name,
            total_coverings,
            date,
        };

        const updatedcoverings = await coverings.findByIdAndUpdate(coveringId, update, { new: true });

        if (!updatedcoverings) {
            return res.status(404).json({ status: "covering not found" });
        }

        res.status(200).json({ status: "covering covering updated", updatedcoverings });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "Error updating covering record", error: err.message });
    }
};

// Delete a covering record
exports.deletecoverings = async (req, res) => {
    try {
        const coveringId = req.params.id;
        await coverings.findByIdAndDelete(coveringId);
        res.status(200).json({ status: "covering record deleted" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "Error deleting covering record", error: err.message });
    }
};
