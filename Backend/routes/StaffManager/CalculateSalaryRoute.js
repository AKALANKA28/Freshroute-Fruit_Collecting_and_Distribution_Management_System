// ./Backend/routes/StaffManager/CalculateSalaryRoute.js
const router = require("express").Router();
const CalculateSalaryCtrl = require("../../controllers/StaffManager/CalculateSalaryCtrl");

router.get("/", CalculateSalaryCtrl.getAllEmployees);
router.get("/get/:id", CalculateSalaryCtrl.getOneEmployee);
router.put("/update/:id", CalculateSalaryCtrl.updateCalculateSalary);

module.exports = router;
