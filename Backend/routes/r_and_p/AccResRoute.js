// AccResRoute.js
//const express = require('express');
const router = require("express").Router();
//const router = express.Router();

const AccResController = require('../../controllers/r_and_p/AccResController');

// Route for creating a new application
router.post('/', AccResController.createAccRes);

// Route for getting all applications
router.get('/', AccResController.getAllAccRess);

module.exports = router;
