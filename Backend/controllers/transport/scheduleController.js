const Schedule = require('../../models/transport/schedule');
const Employee = require('../../models/StaffManager/Employee')

// Add a new schedule record
exports.addSchedule = async (req, res) => {
    try {
        const {schedule_ID, vehicle_no, driver_name, pickup_location, destination, date, quantity} = req.body;

        const newSchedule = new Schedule({
            schedule_ID,
            vehicle_no,
            driver_name,
            pickup_location,
            destination,
            date: new Date(date),
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
        const {schedule_ID, vehicle_no, driver_name, pickup_location, destination, date, quantity } = req.body;

        const updateSchedule = {
            schedule_ID,
            vehicle_no,
            driver_name,
            pickup_location,
            destination,
            date: new Date(date),
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



// Function to create schedules for drivers
exports.createSchedulesForDrivers = async () => {
    try {
      // Query employees with jobrole "driver"
      const drivers = await Employee.find({ jobrole: 'driver' });
  
      // Iterate over each driver
      for (const driver of drivers) {
        // Create a new schedule entry for the driver
        const newSchedule = new Schedule({
          vehicle_no: driver.vehicle_no, // Assuming vehicle_no is a field in the Employee model
          driver_name: driver.name, // Assuming name is a field in the Employee model
          pickup_location: driver.address, // Assuming address is a field in the Employee model
          destination: 'Destination Address', // Set the destination as required
          date: new Date(), // Set the date as required
          quantity: 1, // Set the quantity as required
          // Add any other fields you need to populate in the schedule model
        });
  
        // Save the new schedule entry
        await newSchedule.save();
      }
  
      console.log('Schedules created successfully for drivers.');
    } catch (error) {
      console.error('Error creating schedules:', error);
    }
  };





  exports.getAllDrivers = async (req, res) => {
    try {

        const drivers = await Employee.find({ jobrole: 'Driver' });
        res.json(drivers);
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "Error retrieving drivers", error: err.message });
    }
};