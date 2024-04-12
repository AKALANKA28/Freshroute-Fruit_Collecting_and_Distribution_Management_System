router = require("express").Router();
const PredictionController = require("../../controllers/farmers/predictionController");

router.post("/add", PredictionController.addPrediction);
router.get("/", PredictionController.getAllPredictions);
router.get("/get/:id", PredictionController.getOnePrediction);
router.delete("/delete/:id", PredictionController.deletePrediction);
router.put("/update/:id", PredictionController.updatePrediction);
// Update the route for accepting a prediction request
router.put("/accept/:id", PredictionController.acceptPrediction);

// Update the route for declining a prediction request
router.put("/decline/:id", PredictionController.declinePrediction);

module.exports = router;