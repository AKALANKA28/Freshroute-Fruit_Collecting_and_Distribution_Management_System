const express = require("express");
const gradeController = require("../controllers/gradeController");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/add", gradeController.createGrade);
router.get("/get/:id", gradeController.getGrade);
router.get("/", gradeController.getAllGrade);
router.put("/update/:id", authMiddleware, isAdmin, gradeController.updateGrade);
router.delete("/delete/:id", authMiddleware, isAdmin, gradeController.deleteGrade);


module.exports = router;