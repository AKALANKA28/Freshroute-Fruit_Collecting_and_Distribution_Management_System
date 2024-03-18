// ./Backend/routes/coordinator/SalaryRoute.js
const router = require("express").Router();
const SalaryCtrl = require("../../controllers/coordinator/SalaryCtrl");

router.post("/add", SalaryCtrl.addSalary);
router.get("/", SalaryCtrl.getAllSalaries);
router.get("/get/:id", SalaryCtrl.getOneSalary);
router.delete("/delete/:id", SalaryCtrl.deleteSalary);
router.put("/update/:id", SalaryCtrl.updateSalary);

module.exports = router;
