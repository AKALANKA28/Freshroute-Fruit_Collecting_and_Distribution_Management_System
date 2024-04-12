const express = require("express");
const enqController = require("../controllers/enqController");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/add", enqController.createEnquiry);
router.get("/get/:id", enqController.getEnquiry);
router.get("/", enqController.getallEnquiry);
router.put("/update/:id", authMiddleware, isAdmin, enqController.updateEnquiry);
router.delete("/delete/:id", authMiddleware, isAdmin, enqController.deleteEnquiry);


module.exports = router;