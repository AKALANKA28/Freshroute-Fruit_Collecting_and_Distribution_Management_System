const router = require("express").Router();
const MessageCtrl = require("../../controllers/StaffManager/MessageCtrl");

router.post("/add", MessageCtrl.addMessage);
router.get("/", MessageCtrl.getAllMessages);
router.get("/count", MessageCtrl.getMessagesCount);
router.get("/get/:id", MessageCtrl.getOneMessage);
router.delete("/delete/:id", MessageCtrl.deleteMessage);
router.put("/update/:id", MessageCtrl.updateMessage);

module.exports = router;
