// .Backend/models/coordinator/Salary.js
const mongoose = require("mongoose");

const SalarySchema = new mongoose.Schema({
  jobroll: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
});

const Salary = mongoose.model("Salary", SalarySchema);

module.exports = Salary;