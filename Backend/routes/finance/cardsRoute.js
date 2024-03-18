const express = require('express');
const router = express.Router();
const cardsController = require('../../controllers/finance/cardsController');

// Add a new card 
router.post("/add", cardsController.addcard);

// Retrieve all card 
router.get("/", cardsController.getAllCards);

// Retrieve a specific card  by ID
router.get("/get/:id", cardsController.getCardsById);

// Update a card 
router.patch("/update/:id", cardsController.updateCards);

// Delete a card 
router.delete("/delete/:id", cardsController.deleteCards);

module.exports = router;
