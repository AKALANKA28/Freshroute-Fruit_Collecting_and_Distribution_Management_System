const router = require("express").Router();
const CalculateSalaryCtrl = require("../../controllers/StaffManager/CalculateSalaryCtrl");

router.get("/", CalculateSalaryCtrl.getAllEmployees);
router.get("/:id", CalculateSalaryCtrl.getOneEmployee);
router.put("/update/:id", CalculateSalaryCtrl.updateCalculateSalary);
router.get("/salary/:jobRole", CalculateSalaryCtrl.getSalaryByJobRole);



module.exports = router;
