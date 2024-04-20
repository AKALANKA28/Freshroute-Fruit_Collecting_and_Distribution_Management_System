const router = require("express").Router();
const joiningRequestController = require("../controllers/joiningRequestController");

router.post("/add", joiningRequestController.addJoiningRequest);
router.get("/", joiningRequestController.getAllJoiningRequests);
router.get("/get/:id", joiningRequestController.getOneJoiningRequest);
router.delete("/delete/:id", joiningRequestController.deleteJoiningRequest);
router.put("/update/:id", joiningRequestController.updateJoiningRequest);

module.exports = router;