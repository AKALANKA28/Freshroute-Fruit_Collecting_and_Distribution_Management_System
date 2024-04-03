router = require("express").Router();
const PredictionController = require("../../controllers/farmers/predictionController");

router.post("/add", PredictionController.addPrediction);
router.get("/", PredictionController.getAllPredictions);
router.get("/get/:id", PredictionController.getOnePrediction);
router.delete("/delete/:id", PredictionController.deletePrediction);
router.put("/update/:id", PredictionController.updatePrediction);

module.exports = router;