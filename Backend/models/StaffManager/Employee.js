const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  jobrole: {
    type: String,
    required: true,
  },
  nic: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  accno: {
    type: Number,
    required: true,
  },
  bankname: {
    type: String,
    required: true,
  },
  qualifications: {
    type: String,
    required: true,
  },
  joineddate: {
    type: String,
    required: true,
  },
});

const Employee = mongoose.model("Employee", EmployeeSchema);

module.exports = Employee;
