const router = require("express").Router();
const UnregisteredCtrl = require("../../controllers/StaffManager/UnregisteredCtrl");

router.post("/add", UnregisteredCtrl.addUnregistered);
router.get("/", UnregisteredCtrl.getAllUnregistereds);
router.get("/get/:id", UnregisteredCtrl.getOneUnregistered);
router.delete("/delete/:id", UnregisteredCtrl.deleteUnregistered);
router.put("/update/:id", UnregisteredCtrl.updateUnregistered);
router.get("/count", UnregisteredCtrl.getUnregisteredCount);

module.exports = router;
