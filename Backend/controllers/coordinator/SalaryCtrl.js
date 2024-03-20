// .Backend/controllers/coordinator/SalaryCtrl.js
const Salary = require("../../models/coordinator/Salary");

const addSalary = async (req, res) => {
  const { jobrole, date, salary } = req.body;
  try {
    const newSalary = await Salary.create({ jobrole, date, salary });
    res.json("New Salary Added");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllSalaries = async (req, res) => {
  try {
    const salaries = await Salary.find();
    res.json(salaries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getOneSalary = async (req, res) => {
  const id = req.params.id;
  try {
    const oneSalary = await Salary.findById(id);
    res.status(200).json(oneSalary);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteSalary = async (req, res) => {
  const id = req.params.id;
  try {
    await Salary.findByIdAndDelete(id);
    res.status(200).json({ message: "Salary Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateSalary = async (req, res) => {
  const id = req.params.id;
  const { jobrole, date, salary } = req.body;
  try {
    await Salary.findByIdAndUpdate(id, { jobrole, date, salary });
    res.status(200).json({ message: "Salary Updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  addSalary,
  getAllSalaries,
  getOneSalary,
  deleteSalary,
  updateSalary,
};
