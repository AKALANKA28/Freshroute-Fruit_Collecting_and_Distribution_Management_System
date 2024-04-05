const express = require('express');
const router = express.Router();
const mockController = require('../../controllers/q_and_o/mockController');

// Add a new vehicle record
router.post("/add", mockController.addMockOrder);



module.exports = router;
