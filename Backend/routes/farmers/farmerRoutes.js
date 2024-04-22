router = require("express").Router();
const farmerController = require("../../controllers/farmers/farmerController");

router.post("/add", farmerController.addFarmer);
router.get("/", farmerController.getAllFarmers);
router.get("/get/:id", farmerController.getOneFarmer);
router.delete("/delete/:id", farmerController.deleteFarmer);
router.put("/update/:id", farmerController.updateFarmer);
router.delete("/deleteFarmerByJoinRequestID/:joinRequestId", farmerController.deleteFarmerByJoinRequestID);
router.get("/totalCount", farmerController.getTotalFarmersCount);
router.get("/cities", farmerController.getCities);

module.exports = router;