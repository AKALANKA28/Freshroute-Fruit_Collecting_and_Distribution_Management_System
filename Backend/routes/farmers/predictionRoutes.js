router = require("express").Router();
const PredictionController = require("../../controllers/farmers/predictionController");

router.post("/add", PredictionController.addPrediction);
router.get("/", PredictionController.getAllPredictions);
router.get("/get/:id", PredictionController.getOnePrediction);
router.delete("/delete/:id", PredictionController.deletePrediction);
router.put("/update/:id", PredictionController.updatePrediction);
router.put("/accept/:id", PredictionController.acceptPrediction);
router.put("/decline/:id", PredictionController.declinePrediction);
router.get("/totalCount", PredictionController.getTotalPredictionsCount);
router.get("/totalEarnings", PredictionController.getTotalEarnings);

module.exports = router;