const Employee = require("../../models/StaffManager/Employee");
const Salary = require("../../models/coordinator/Salary");

const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    const employeesWithSalary = await Promise.all(
      employees.map(async (employee) => {
        const salary = await Salary.findOne({ jobrole: employee.jobrole });
        if (salary) {
          employee.salary = salary.salary;
        }
        return employee;
      })
    );
    res.json(employeesWithSalary);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getOneEmployee = async (req, res) => {
  const id = req.params.id;
  try {
    const employee = await Employee.findById(id);
    if (employee) {
      const salary = await Salary.findOne({ jobrole: employee.jobrole });
      if (salary) {
        employee.salary = salary.salary;
      }
    }
    res.status(200).json(employee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateCalculateSalary = async (req, res) => {
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
    salary,
    allowance,
    epfe,
    epfr,
    etf,
  } = req.body;

  const salaryWithEPF = salary - salary * (epfe / 100);
  const netsalary = salaryWithEPF + allowance * 1;

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
      salary,
      allowance,
      epfe,
      epfr,
      etf,
      netsalary,
    });
    res.status(200).json({ message: "Employee updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getSalaryByJobRole = async (req, res) => {
  const jobRole = req.params.jobRole;
  try {
    const salary = await Salary.findOne({ jobrole: jobRole });
    res.status(200).json({ salary: salary }); // Assuming the salary is stored as a property in the Salary model
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


module.exports = {
  getAllEmployees,
  getOneEmployee,
  updateCalculateSalary,
  getSalaryByJobRole,
  
};
