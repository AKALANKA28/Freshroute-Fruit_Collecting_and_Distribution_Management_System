// AccResRoute.js
//const express = require('express');
const router = require("express").Router();
const AccResourceController = require("../../controllers/r_and_p/AccResourceController");
//const router = express.Router();

// Route for creating a new application
router.post('/add', AccResourceController.addAAccResource);
router.get('/', AccResourceController.getAllAccResources);
router.get("/get/:id", AccResourceController.getOneAccResource);
router.delete("/delete/:id", AccResourceController.deleteAccResource);
router.put("/update/:id", AccResourceController.updateAccResource);


module.exports = router;
