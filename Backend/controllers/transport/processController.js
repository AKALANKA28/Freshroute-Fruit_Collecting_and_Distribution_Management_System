const Process = require('../../models/transport/process');

// Add a new process record
exports.addprocess = async (req, res) => {
    try {
        const {process_ID, vehicle_no, driver_name,current_status } = req.body;

        const newProcess = new Process({
            process_ID,
            vehicle_no,
            driver_name,
            current_status,
        });

        await newProcess.save();
        res.json("process Added");
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "Error adding process record", error: err.message });
    }
};

// Retrieve all process records
exports.getAllprocess = async (req, res) => {
    try {
        const processes = await Process.find();
        res.json(processes);
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "Error retrieving process records", error: err.message });
    }
};

// Retrieve a specific process record by ID
exports.getprocessById = async (req, res) => {
    try {
        const processId = req.params.id
        const Process = await Process_status.findById(processId);
        
        if (!Process) {
            return res.status(404).json({ status: "process not found" });
        }
        
        res.status(200).json({ status: "process fetched", Process });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "Error retrieving process record", error: err.message });
    }
};

// Update a process record
exports.updateprocess = async (req, res) => {
    try {
        const processId = req.params.id;
        const {process_ID, vehicle_no, driver_name, current_status } = req.body;

        const updateprocess = {
            process_ID,
            vehicle_no,
            driver_name,
            current_status,
        };

        const updatedprocess = await Process.findByIdAndUpdate(processId, updateprocess, { new: true });

        if (!updatedprocess) {
            return res.status(404).json({ status: "process not found" });
        }

        res.status(200).json({ status: "process record updated", updatedprocess });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "Error updating process record", error: err.message });
    }
};

// Delete a process record
exports.deleteprocess = async (req, res) => {
    try {
        const processId = req.params.id;
        await Process.findByIdAndDelete(processId);
        res.status(200).json({ status: "process record deleted" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "Error deleting process record", error: err.message });
    }
};
