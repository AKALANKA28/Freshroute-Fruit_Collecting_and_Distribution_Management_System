// Import necessary models
const Employee = require("../../models/StaffManager/Employee");
const Salary = require("../../models/coordinator/Salary");

// Controller function to get all employees with their corresponding salaries
const getAllEmployees = async (req, res) => {
  try {
    // Fetch all employees
    const employees = await Employee.find();
    // Fetch salary for each employee asynchronously
    const employeesWithSalary = await Promise.all(
      employees.map(async (employee) => {
        // Find salary based on job role
        const salary = await Salary.findOne({ jobrole: employee.jobrole });
        // If salary found, add it to employee object
        if (salary) {
          employee.salary = salary.salary;
        }
        return employee;
      })
    );
    // Send response with employees along with their salaries
    res.json(employeesWithSalary);
  } catch (err) {
    // Handle error
    res.status(500).json({ error: err.message });
  }
};

// Controller function to get one employee with their corresponding salary
const getOneEmployee = async (req, res) => {
  const id = req.params.id;
  try {
    // Find employee by ID
    const employee = await Employee.findById(id);
    // If employee found, find salary based on job role
    if (employee) {
      const salary = await Salary.findOne({ jobrole: employee.jobrole });
      // If salary found, add it to employee object
      if (salary) {
        employee.salary = salary.salary;
      }
    }
    // Send response with employee details
    res.status(200).json(employee);
  } catch (err) {
    // Handle error
    res.status(500).json({ error: err.message });
  }
};

// Controller function to update employee details and calculate salary
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

  // Calculate net salary
  const salaryWithEPF = salary - salary * (epfe / 100);
  const netsalary = salaryWithEPF + allowance * 1;

  try {
    // Update employee details in the database
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
    // Send success message
    res.status(200).json({ message: "Employee updated" });
  } catch (err) {
    // Handle error
    res.status(500).json({ error: err.message });
  }
};

// Controller function to get salary by job role
const getSalaryByJobRole = async (req, res) => {
  const jobRole = req.params.jobRole;
  try {
    // Find salary based on job role
    const salary = await Salary.findOne({ jobrole: jobRole });
    // Send response with salary details
    res.status(200).json({ salary: salary }); // Assuming the salary is stored as a property in the Salary model
  } catch (err) {
    // Handle error
    res.status(500).json({ error: err.message });
  }
};

// Export controller functions
module.exports = {
  getAllEmployees,
  getOneEmployee,
  updateCalculateSalary,
  getSalaryByJobRole,
};
