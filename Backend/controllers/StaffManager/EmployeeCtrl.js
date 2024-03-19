const Employee = require("../../models/StaffManager/Employee");

const addEmployee = async (req, res) => {
  const {
    name,
    jobrole,
    nic,
    address,
    email,
    accno,
    bankname,
    qualifications,
    joineddate,
    salary,
    allowance,
    epfe,
    epfr,
    etf,
    netsalary,
  } = req.body;

  try {
    const newEmployee = await Employee.create({
      name,
      jobrole,
      nic,
      address,
      email,
      accno,
      bankname,
      qualifications,
      joineddate,
      salary: 0,
      allowance: 0,
      epfe: 0,
      epfr: 0,
      etf: 0,
      netsalary: 0,
    });
    res.json("New Employee Added");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getOneEmployee = async (req, res) => {
  const id = req.params.id;
  try {
    const employee = await Employee.findById(id);
    res.status(200).json(employee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteEmployee = async (req, res) => {
  const id = req.params.id;
  try {
    await Employee.findByIdAndDelete(id);
    res.status(200).json({ message: "Employee Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateEmployee = async (req, res) => {
  const id = req.params.id;
  const {
    name,
    jobrole,
    nic,
    address,
    email,
    accno,
    bankname,
    qualifications,
    joineddate,
  } = req.body;
  try {
    await Employee.findByIdAndUpdate(id, {
      name,
      jobrole,
      nic,
      address,
      email,
      accno,
      bankname,
      qualifications,
      joineddate,
    });
    res.status(200).json({ message: "Employee updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  addEmployee,
  getAllEmployees,
  getOneEmployee,
  deleteEmployee,
  updateEmployee,
};
