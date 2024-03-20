const Schedule = require('../../models/transport/schedule');

// Add a new schedule record
exports.addSchedule = async (req, res) => {
    try {
        const {schedule_ID, vehicle_no, driver_name, pickup_location, destination, date, time, quantity} = req.body;

        const newSchedule = new Schedule({
            schedule_ID,
            vehicle_no,
            driver_name,
            pickup_location,
            destination,
            date: new Date(date),
            time,
            quantity,
      
        });

        await newSchedule.save();
        res.json("Schedule Added");
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "Error adding schedule record", error: err.message });
    }
};

// Retrieve all schedule records
exports.getAllSchedule = async (req, res) => {
    try {

        const schedules = await Schedule.find();
        res.json(schedules);
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "Error retrieving schedule records", error: err.message });
    }
};

// Retrieve a specific schedule record by ID
exports.getScheduleById = async (req, res) => {
    try {
        const ScheduleId = req.params.id;
        const schedule = await schedule.findById(ScheduleId);
        
        if (!schedule) {
            return res.status(404).json({ status: "schedule not found" });
        }
        
        res.status(200).json({ status: "schedule fetched", schedule });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "Error retrieving schedule record", error: err.message });
    }
};

// Update a schedule record
exports.updateSchedule = async (req, res) => {
    try {
        const scheduleId = req.params.id;
        const {schedule_ID, vehicle_no, driver_name, pickup_location, destination, date, time, quantity } = req.body;

        const updateSchedule = {
            schedule_ID,
            vehicle_no,
            driver_name,
            pickup_location,
            destination,
            date: new Date(date),
            time,
            quantity,
        };

        const updatedSchedule = await Schedule.findByIdAndUpdate(scheduleId, updateSchedule, { new: true });

        if (!updatedSchedule) {
            return res.status(404).json({ status: "Schedule not found" });
        }

        res.status(200).json({ status: "Schedule record updated", updatedSchedule });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "Error updating Schedule record", error: err.message });
    }
};

// Delete a Schedule record
exports.deleteSchedule = async (req, res) => {
    try {
        const scheduleId = req.params.id;
        await Schedule.findByIdAndDelete(scheduleId);
        res.status(200).json({ status: "Schedule record deleted" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "Error deleting schedule record", error: err.message });
    }
};
