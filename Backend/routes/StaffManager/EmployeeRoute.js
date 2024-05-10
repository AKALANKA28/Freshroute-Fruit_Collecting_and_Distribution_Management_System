const router = require("express").Router();
const EmployeeCtrl = require("../../controllers/StaffManager/EmployeeCtrl");

router.post("/add", EmployeeCtrl.addEmployee);
router.get("/", EmployeeCtrl.getAllEmployees);
router.get("/get/:id", EmployeeCtrl.getOneEmployee);
router.delete("/delete/:id", EmployeeCtrl.deleteEmployee);
router.put("/update/:id", EmployeeCtrl.updateEmployee);
router.get("/empcount", EmployeeCtrl.getEmployeeCount); 



module.exports = router;
