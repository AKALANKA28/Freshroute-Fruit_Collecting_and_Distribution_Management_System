const router = require("express").Router();
const NoticeCtrl = require("../../controllers/StaffManager/NoticeCtrl");

router.post("/add", NoticeCtrl.addNotice);
router.get("/", NoticeCtrl.getAllNotices);
router.get("/count", NoticeCtrl.getNoticesCount);
router.get("/get/:id", NoticeCtrl.getOneNotice);
router.delete("/delete/:id", NoticeCtrl.deleteNotice);
router.put("/update/:id", NoticeCtrl.updateNotice);

module.exports = router;
