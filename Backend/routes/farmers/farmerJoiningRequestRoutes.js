router = require("express").Router();
const farmerJoiningRequestController = require("../../controllers/farmers/farmerJoiningRequestController");

router.post("/add", farmerJoiningRequestController.addFarmerJoiningRequest);
router.get("/", farmerJoiningRequestController.getAllFarmerJoiningRequests);
router.get("/get/:id", farmerJoiningRequestController.getOneFarmerJoiningRequest);
router.delete("/delete/:id", farmerJoiningRequestController.deleteFarmerJoiningRequest);
router.put("/update/:id", farmerJoiningRequestController.updateFarmerJoiningRequest);

module.exports = router;