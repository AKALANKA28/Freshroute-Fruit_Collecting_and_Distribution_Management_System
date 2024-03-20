const Cards = require('../../models/finance/cards');


// Add a new Card 
exports.addcard = async (req, res) => {
    try {
        const { name, icon, amount, percentage, active} = req.body;

        const newCards = new Cards({
            name,
            icon,
            amount,
            percentage, 
            active     
        });

        await newCards.save();
        res.json("Card Added");
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "Error adding Card ", error: err.message });
    }
};

// Retrieve all Card
exports.getAllCards = async (req, res) => {
    try {
        const cards = await Cards.find();
        res.json(cards);
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "Error retrieving Card ", error: err.message });
    }
};

// Retrieve a specific Card by ID
exports.getCardsById = async (req, res) => {
    try {
        const CardsId = req.params.id;
        const sale = await Cards.findById(CardsId);
        
        if (!sale) {
            return res.status(404).json({ status: "Card not found" });
        }
        
        res.status(200).json({ status: "Card details fetched", sale });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "Error retrieving Cards ", error: err.message });
    }
};

// Update a Card 
exports.updateCards = async (req, res) => {
    try {
        const CardsId = req.params.id;
        const { name, icon, amount, percentage, active } = req.body;

        const updateCards = {
            name,
            icon,
            amount,
            percentage, 
            active
        };

        const updatedCards = await Cards.findByIdAndUpdate(CardsId, updateCards, { new: true });

        if (!updatedCards) {
            return res.status(404).json({ status: "Card not found" });
        }

        res.status(200).json({ status: "Card updated", updatedCards });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "Error updating Card  ", error: err.message });
    }
};

// Delete a Cards 
exports.deleteCards = async (req, res) => {
    try {
        const CardsId = req.params.id;
        await Cards.findByIdAndDelete(CardsId);
        res.status(200).json({ status: "Card deleted" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "Error deleting Card", error: err.message });
    }
};
